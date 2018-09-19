import { Plug } from './plug.js';
import { PagePropertyBase } from './pagePropertyBase.js';
import { Settings } from './lib/settings.js';

export class DraftProperty extends PagePropertyBase {
    /**
     * @constructor
     * @param {String|Number} id - The numeric ID or page path string.
     * @param {Settings} [settings] - The martian Settings object to direct the requests performed.
     */
    constructor(id, settings = new Settings()) {
        super(id);
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'drafts', this._id, 'properties');
    }
}
