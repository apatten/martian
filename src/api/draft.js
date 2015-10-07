import Page from './page';
export default class Draft extends Page {
    constructor(id = 'home') {
        super(id);
        this._plug = new Plug().at('@api', 'deki', 'drafts', this._id);
    }
}