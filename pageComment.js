import { Plug } from '/mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { utility } from './lib/utility.js';
import { pageCommentModel } from './models/pageCommentModel.js';

export class PageComment {
    constructor(pageId = 'home', commentId, settings = new Settings()) {
        if(!commentId) {
            throw new Error('The PageComment must be constructed with a comment ID.');
        }
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages', utility.getResourceId(pageId, 'home'), 'comments', commentId);
    }
    update(newComment) {
        return this._plug.at('content').put(newComment, utility.textRequestType).then((r) => r.json()).then(modelParser.createParser(pageCommentModel));
    }
    delete() {
        return this._plug.delete();
    }
}
export class PageCommentManager {
    constructor(pageId = 'home', settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages', utility.getResourceId(pageId, 'home'), 'comments');
    }
    addComment(comment, title = '') {
        if(!comment) {
            return Promise.reject(new Error('The comment text must be supplied, and must not be empty.'));
        }
        return this._plug.withParam('title', title).post(comment, utility.textRequestType).then((r) => r.json()).then(modelParser.createParser(pageCommentModel));
    }
}
