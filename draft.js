import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { PageBase } from './pageBase.js';
import { pageModel } from './models/page.model.js';

/**
 * A class for managing a single unpublished draft page.
 */
export class Draft extends PageBase {

    /**
     * Construct a Draft object.
     * @param {Number|String} [id=home] - The id of the draft to construct.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id = 'home', settings = new Settings()) {
        super(id);
        this._settings = settings;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'drafts', this._id);
    }

    /**
     * Deactivate the current draft and revert to the published page.
     * @returns {Promise.<pageModel>} - A Promise that, when resolved, yields a {@link pageModel} for the deactivated page.
     */
    deactivate() {
        let pageModelParser = modelParser.createParser(pageModel);
        return this._plug.at('deactivate').post().then((r) => r.json()).then(pageModelParser);
    }

    /**
     * Publish the draft.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful publish operation.
     */
    publish() {
        return this._plug.at('publish').post();
    }

    /**
     * Unpublish a live page and create a draft out of it.
     * @returns {Promise.<pageModel>} - A Promise that, when resolved, yields a {@link pageModel} for the unpublished page.
     */
    unpublish() {
        return this._plug.at('unpublish').post().then((r) => r.json()).then(modelParser.createParser(pageModel));
    }

    /**
     * Update display title for a draft
     * @param {String} title - The new title for the draft
     */
    setTitle(title) {
        if(!title) {
            return Promise.reject(new Error('A valid title must be supplied for the draft.'));
        }
        return this._plug.at('title').put(title, utility.textRequestType).then((r) => r.json()).then(modelParser.createParser(pageModel));
    }
}

/**
 * A class for managing unpublished draft pages.
 */
export class DraftManager {

    /**
     * Create a new DraftManager.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._settings = settings;
    }

    /**
     * Create a new draft on the site where a page does not already exist.
     * @param {String} newPath - The path of the new draft.
     * @returns {Promise.<pageModel>} - A Promise that, when resolved, yields a {@link pageModel} for the newly-created draft.
     */
    createDraft(newPath) {
        let plug = new Plug(this._settings.host, this._settings.plugConfig).at('@api', 'deki', 'drafts', utility.getResourceId(newPath), 'create');
        let pageModelParser = modelParser.createParser(pageModel);
        return plug.post().then((r) => r.json()).then(pageModelParser);
    }

    /**
     * Fetch a new Draft object by ID.
     * @param {Number|String} [id=home] - The id of the draft to return.
     * @returns {Draft} - A new {@link Draft} object.
     */
    getDraft(id) {
        return new Draft(id, this._settings);
    }
}
