import { Plug } from 'mindtouch-http.js/plug.js';
import { ProgressPlug } from 'mindtouch-http.js/progressPlug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { fileModel } from './models/file.model.js';
import { fileRevisionsModel } from './models/fileRevisions.model.js';
import { apiErrorModel } from './models/apiError.model.js';

/**
 * A class for working with file attachments within the MindTouch site.
 */
export class File {

    /**
     * Construct a new File object.
     * @param {Number} id - The resource ID of the file.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id, settings = new Settings()) {
        this._id = id;
        this._settings = settings;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'files', id);
        this._progressPlug = new ProgressPlug(settings.host, settings.plugConfig).at('@api', 'deki', 'files', id);
        this._errorParser = modelParser.createParser(apiErrorModel);
    }

    /**
     * Get the file attachment information.
     * @returns {Promise.<fileModel>} - A Promise that, when resolved, yields a {@link fileModel} containing the attachment information.
     */
    getInfo() {
        let fileModelParser = modelParser.createParser(fileModel);
        return this._plug.at('info').get().then((r) => r.json()).then(fileModelParser);
    }

    /**
     * Get the revision list of the file attachment.
     * @returns {Promise.<fileRevisionsModel>} - A Promise that, when resolved, yields a {@link fileRevisionsModel} containing the revision listing.
     */
    getRevisions() {
        return this._plug.at('revisions').get().then((r) => r.json()).then(modelParser.createParser(fileRevisionsModel));
    }

    /**
     * Set the description for the file.
     * @param {String} description - The new file description.
     * @returns {Promise.<fileModel>} - A Promise that, when resolved, yields a {@link fileModel} containing the file information.
     */
    setDescription(description) {
        let fileModelParser = modelParser.createParser(fileModel);
        return this._plug.at('description').put(description, utility.textRequestType).then((r) => r.json()).then(fileModelParser);
    }

    /**
     * Delete the file from the MindTouch site.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful file deletion.
     */
    delete() {
        return this._plug.delete();
    }

    /**
     * Upload a new file to serve as a revision in place of the current file.
     * @param {File} file - The file object to upload.
     * @param {String} filename - The filename of the new revision.
     * @param {function} progress - A function that is called to indicate upload progress before the upload is complete.
     * @returns {Promise.<Object>} - A Promise that will be resolved with the updated file data, or rejected with an error specifying the reason for rejection.
     */
    addRevision(file, { name = file.name, size = file.size, type = file.type, progress = null } = {}) {
        if(progress !== null) {
            const progressInfo = { callback: progress, size };
            return this._progressPlug.at(utility.getResourceId(name)).put(file, type, progressInfo).then((r) => JSON.parse(r.responseText)).then(modelParser.createParser(fileModel));
        }
        return this._plug.withHeader('Content-Length', size).at(utility.getResourceId(name)).put(file, type).then((r) => r.json()).then(modelParser.createParser(fileModel));
    }

    /**
     * Move the file to a new page.
     * @param {Object} params - The parameters that direct the API request.
     * @param {Number} params.to - The page ID of the page to move to.
     * @param {String} params.name - The name of the new, moved file.
     * @returns {Promise.<Object>} - A Promise that will be resolved with the updated file data, or rejected with an error specifying the reason for rejection.
     */
    move(params = {}) {
        if(!params.to) {
            return Promise.reject(new Error('The `to` parameter must be specified to move a file.'));
        }
        if(!params.name) {
            return Promise.reject(new Error('The `name` parameter must be specified to move a file.'));
        }
        return this._plug.at('move')
            .withParams(params)
            .post(null, utility.textRequestType)
            .then((r) => r.json())
            .then(modelParser.createParser(fileModel))
            .catch((err) => Promise.reject(this._errorParser(err)));
    }
}

export class FileDraft extends File {

    /**
     * @param {Number} id - The resource ID of the file.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id, settings = new Settings()) {
        super(id, settings);
        this._plug = this._plug.withParam('draft', 'true');
        this._progressPlug = this._progressPlug.withParam('draft', 'true');
    }
}
