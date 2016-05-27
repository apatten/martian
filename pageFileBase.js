import { utility } from './lib/utility';
import { modelParser } from './lib/modelParser';
import { fileModel } from './models/file.model';

/**
 * A base class for managing file attachments on both published pages and drafts.  This class can not be instantiated directly.
 */
export class PageFileBase {
    constructor(pageId, filename) {
        if(this.constructor.name === 'PageFileBase') {
            throw new TypeError('PageFileBase must not be constructed directly.  Use one of PageFile() or DraftFile()');
        }
        this._pageId = utility.getResourceId(pageId, 'home');
        this._filename = utility.getFilenameId(filename);
    }

    /**
     * Get the URI for direct access to the file attachment.
     * @returns {String} - The file URI.
     */
    get fileUrl() {
        return this._plug.url;
    }

    /**
     * Gets the information for the file attachment.
     * @returns {Promise.<fileModel>} - A Promise that, when resolved, yields a {@link fileModel} containing the file information.
     */
    getInfo() {
        let fileModelParser = modelParser.createParser(fileModel);
        return this._plug.at('info').get().then((r) => r.json()).then(fileModelParser);
    }

    /**
     * Delete the file attachment fron the page.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful delete operation.
     */
    delete() {
        return this._plug.delete();
    }

    /**
     * Get the description of the file attachment.
     * @returns {Promise.<String>} - A Promise that, when resolved, yields the file description.
     */
    getDescription() {
        return this._plug.at('description').get().then((r) => r.json());
    }

    /**
     * Remove the description from the file attachment.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful removal.
     */
    clearDescription() {
        return this._plug.at('description').delete();
    }

    /**
     * Update the description of the file attachment.
     * @param {String} [description=''] - The new description to set.
     * @returns {Promise.<fileModel>} - A Promise that, when resolved, yields a {@link fileModel} containing the file information.
     */
    updateDescription(description = '') {
        let fileModelParser = modelParser.createParser(fileModel);
        return this._plug.at('description').put(description, utility.textRequestType).then((r) => r.json()).then(fileModelParser);
    }
}
