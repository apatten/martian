import { Plug } from 'mindtouch-http';
import { PageFileBase } from './pageFileBase';
import { Settings } from './lib/settings';

/**
 * A class for managing a file attachment on an unpublished page.
 */
export class DraftFile extends PageFileBase {

    /**
     * Construct a new DraftFile
     * @param {Number|String} [pageId='home'] - The ID of the unpublished page.
     * @param {String} filename - The filename of the file to manage.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(pageId, filename, settings = new Settings()) {
        super(pageId, filename);
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'drafts', this._pageId, 'files', this._filename);
    }
}
