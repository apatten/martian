import { Plug, progressPlugFactory } from 'mindtouch-http';
import { Settings } from './lib/settings';
import { utility } from './lib/utility';
import { modelParser } from './lib/modelParser';
import { fileModel } from './models/file.model';
import { fileRevisionsModel } from './models/fileRevisions.model';

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
     * @param { File } file - The file object to upload.
     * @param { String } filename - The filename of the new revision.
     * @param { function } progress - A function that is called to indicate upload progress before the upload is complete.
     */
    addRevision(file, filename, progress) {
        const progressPlug = new progressPlugFactory.ProgressPlug(this._settings.host, this._settings.plugConfig).at('@api', 'deki', 'files', this._id);
        const progressInfo = { callback: progress, size: file.size };
        return progressPlug.at(utility.getResourceId(filename)).put(file, file.type, progressInfo).then((r) => JSON.parse(r.responseText)).then(modelParser.createParser(fileModel));
    }
}
