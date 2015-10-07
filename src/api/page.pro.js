import Page from 'api/page';
import pageMoveModel from 'models/pageMove.model';
export default class PagePro extends Page {
    constructor(id = 'home') {
        super(id);
    }
    setOverview(options = {}) {
        if(!('body' in options)) {
            return Promise.reject(new Error('No overview body was supplied'));
        }
        let request = `<overview>${options.body}</overview>`;
        return this._plug.at('overview').put(request);
    }
    move(params = {}) {
        return this._plug.at('move').withParams(params).post(null, 'text/plain; charset=utf-8').then(pageMoveModel.parse);
    }
}
