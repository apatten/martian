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
import {Plug} from './lib/plug';
import {utility} from './lib/utility';
import {PageBase} from './pageBase';
import {pageModel} from './models/page.model';
import {subpagesModel} from './models/subpages.model';
import {pageContentsModel} from './models/pageContents.model';
import {pageTreeModel} from './models/pageTree.model';
import {pageRatingModel} from './models/pageRating.model';
import {pageMoveModel} from './models/pageMove.model';
export class Page extends PageBase {
    constructor(id = 'home', settings) {
        super(id);
        this._plug = new Plug(settings).at('@api', 'deki', 'pages', this._id);
    }
    getInfo(params = {}) {
        let infoParams = { exclude: 'revision' };
        Object.keys(params).forEach((key) => {
            infoParams[key] = params[key];
        });
        return this._plug.at('info').withParams(infoParams).get().then(pageModel.parse);
    }
    getSubpages(params) {
        return this._plug.at('subpages').withParams(params).get().then(subpagesModel.parse);
    }
    getTree(params) {
        return this._plug.at('tree').withParams(params).get().then(pageTreeModel.parse);
    }
    getTreeIds() {
        return this._plug.at('tree').withParam('format', 'ids').get().then((idString) => {
            return idString.split(',').map((id) => {
                let numId = parseInt(id, 10);
                if(isNaN(numId)) {
                    throw new Error('Unable to parse the tree IDs.');
                }
                return numId;
            });
        }).catch((e) => {
            return Promise.reject({ message: e.message });
        });
    }
    getRating() {
        return this._plug.at('ratings').get().then(pageRatingModel.parse);
    }
    rate(rating = '', oldRating = '') {
        rating = rating.toString();
        oldRating = oldRating.toString();
        if(rating !== '1' && rating !== '0' && rating !== '') {
            throw new Error('Invalid rating supplied');
        }
        if(oldRating !== '1' && oldRating !== '0' && oldRating !== '') {
            throw new Error('Invalid rating supplied for the old rating');
        }
        return this._plug.at('ratings').withParams({ score: rating, previousScore: oldRating }).post(null, utility.textRequestType).then(pageRatingModel.parse);
    }
    getHtmlTemplate(path, params = {}) {
        params.pageid = this._id;

        // Double-URL-encode the path and add '=' to the beginning.  This makes
        //  it a proper page ID to be used in a URI segment.
        let templatePath = '=' + encodeURIComponent(encodeURIComponent(path));
        let contentsPlug = new Plug().at('@api', 'deki', 'pages', templatePath, 'contents').withParams(params);
        return contentsPlug.get().then(pageContentsModel.parse);
    }
    move(params = {}) {
        return this._plug.at('move').withParams(params).post(null, 'text/plain; charset=utf-8').then(pageMoveModel.parse);
    }
    activateDraft() {
        return this._plug.at('activate-draft').post().then(pageModel.parse);
    }
}
