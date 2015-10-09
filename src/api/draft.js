import Page from './page';
import Plug from 'lib/plug';
export default class Draft extends Page {
    constructor(id = 'home') {
        super(id);
        this._plug = new Plug().at('@api', 'deki', 'drafts', this._id);
    }
}
