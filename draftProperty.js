import { Plug } from 'mindtouch-http.js/plug.js';
import { PagePropertyBase } from './pagePropertyBase.js';
import { Settings } from './lib/settings.js';

export class DraftProperty extends PagePropertyBase {
    constructor(id, settings = new Settings()) {
        super(id);
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'drafts', this._id, 'properties');
    }
}
