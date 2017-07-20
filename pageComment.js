/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Plug } from 'mindtouch-http.js/plug.js';
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
