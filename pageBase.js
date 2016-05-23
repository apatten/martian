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
import { utility } from './lib/utility';
import { modelParser } from './lib/modelParser';
import { pageModel } from './models/page.model';
import { pageContentsModel } from './models/pageContents.model';
import { pageTagsModel } from './models/pageTags.model';
import { pageFilesModel } from './models/pageFiles.model';
import { pageEditModel } from './models/pageEdit.model';
import { relatedPagesModel } from './models/relatedPages.model';

function _handleVirtualPage(error) {
    if(error.status === 404 && error.responseText) {
        let responseJson = JSON.parse(error.responseText);
        if(responseJson['@virtual'] === 'true') {
            let pageModelParser = modelParser.createParser(pageModel);
            return Promise.resolve(pageModelParser(responseJson));
        }
    }
    throw error;
}
export class PageBase {
    constructor(id) {
        if(this.constructor.name === 'PageBase') {
            throw new TypeError('PageBase must not be constructed directly.  Use one of Page() or Draft()');
        }
        this._id = utility.getResourceId(id, 'home');
    }
    getFullInfo() {
        let pageModelParser = modelParser.createParser(pageModel);
        return this._plug.getJson().then(pageModelParser).catch(_handleVirtualPage);
    }
    getContents(params) {
        let pageContentsModelParser = modelParser.createParser(pageContentsModel);
        return this._plug.at('contents').withParams(params).getJson().then(pageContentsModelParser);
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
        let pageEditModelParser = modelParser.createParser(pageEditModel);
        return this._plug.at('contents').withParams(contentsParams).postJson(contents, 'text/plain; charset=utf-8').then(pageEditModelParser);
    }
    getFiles(params = {}) {
        let pageFilesModelParser = modelParser.createParser(pageFilesModel);
        return this._plug.at('files').withParams(params).getJson().then(pageFilesModelParser);
    }
    getOverview() {
        return this._plug.at('overview').getJson().then((overview) => {
            return Promise.resolve({ overview: overview });
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
        let pageTagsModelParser = modelParser.createParser(pageTagsModel);
        return this._plug.at('tags').getJson().then(pageTagsModelParser);
    }
    getDiff() {
        throw new Error('Page.getDiff() is not implemented');
    }
    getRelated() {
        let relatedPagesModelParser = modelParser.createParser(relatedPagesModel);
        return this._plug.at('related').getJson().then(relatedPagesModelParser);
    }
}
