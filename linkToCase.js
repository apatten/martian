import { Plug } from '/mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { linkToCaseLinkList } from './models/linkToCaseLinkList.js';

export class LinkToCase {
    /**
     *
     * @param {String} caseId The ID of the case to manage
     * @param {*} settings The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(caseId, settings = new Settings()) {
        if (!caseId) {
            throw new Error('The LinkToCase must be constructed with a case ID.');
        }
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'linktocase', caseId);
    }

    /**
     * Get a listing of pages that have this case linked to them
     * @returns {Promise} A Promise that, when resolved, yields the list of pages that this case is linked to
     */
    getPageLinks() {
        return this._plug
            .at('links')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(linkToCaseLinkList));
    }
}
