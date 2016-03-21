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
import {utility} from './lib/utility';
import {modelHelper} from './models/modelHelper';
import {pageModel} from './models/page.model';
import {pageContentsModel} from './models/pageContents.model';
import {pageTagsModel} from './models/pageTags.model';
import {pageFilesModel} from './models/pageFiles.model';
import {pageEditModel} from './models/pageEdit.model';
function _handleVirtualPage(error) {
    if(error.errorCode === 404 && error.response && error.response['@virtual']) {
        return Promise.resolve(pageModel.parse(error.response));
    }
    throw error;
}
export class PageBase {
    constructor(id, settings) {
        if(this.constructor.name === 'PageBase') {
            throw new TypeError('PageBase must not be constructed directly.  Use one of Page() or Draft()');
        }
        this._id = utility.getResourceId(id, 'home');
    }
    getFullInfo() {
        return this._plug.get().then(pageModel.parse).catch(_handleVirtualPage);
    }
    getContents(params) {
        return this._plug.at('contents').withParams(params).get().then(pageContentsModel.parse);
    }
    setContents(contents, params = {}) {
        if(typeof contents !== 'string') {
            return Promise.reject(new Error('Contents should be string.'));
        }
        let contentsParams = {
            edittime: 'now'
        };
        Object.keys(params).forEach((key) => {
            contentsParams[key] = params[key];
        });
        return this._plug.at('contents').withParams(contentsParams).post(contents, 'text/plain; charset=utf-8').then(pageEditModel.parse);
    }
    getFiles(params = {}) {
        return this._plug.at('files').withParams(params).get().then(pageFilesModel.parse);
    }
    getOverview() {
        return this._plug.at('overview').get().then(JSON.parse).then((overview) => {
            return Promise.resolve({ overview: modelHelper.getString(overview) });
        }).catch(() => {
            return Promise.reject('Unable to parse the page overview response');
        });
    }
    setOverview(options = {}) {
        if(!('body' in options)) {
            return Promise.reject(new Error('No overview body was supplied'));
        }
        let request = `<overview>${options.body}</overview>`;
        return this._plug.at('overview').put(request);
    }
    getTags() {
        return this._plug.at('tags').get().then(pageTagsModel.parse);
    }
}
