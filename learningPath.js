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
import {learningPathModel} from './models/learningPath.model';
import {pageModel} from './models/page.model';
let maxSummaryCount = 500;
function getSaveXML(data) {
    let template = `<title>${data.title}</title>
        <summary>${data.summary}</summary>
        <category>${data.category}</category>`;
    if(data.pages && Array.isArray(data.pages)) {
        data.pages.forEach((page) => {
            template = `${template}
                <pages>${page.id}</pages>`;
        });
    }
    template = `<learningpath>${template}</learningpath>`;
    return template;
}
export class LearningPath {

    // Constructor
    constructor(name, settings) {
        this._plug = new Plug(settings).at('@api', 'deki', 'learningpaths', `${name}`);
    }
    getInfo() {
        return this._plug.get().then(learningPathModel.parse);
    }

    // learning path operations
    update(content) {
        if(content.summary && content.summary.length > maxSummaryCount) {
            content.summary = content.summary.substring(0, maxSummaryCount);
        }

        // Do this without mustache
        let XMLData = getSaveXML(content);
        return this._plug.at(`=${this._name}`).withParam('edittime', content.edittime).post(XMLData, 'application/xml').then(learningPathModel.parse);
    }
    remove() {
        return this._plug.at(`=${this._name}`).del();
    }

    // Page operations
    addPage(pageId, editTime) {
        return this._plug.at(`=${this._name}`, 'pages', pageId).withParam('edittime', editTime).post().then(pageModel.parse);
    }
    removePage(pageId, editTime) {
        return this._plug.at(`=${this._name}`, 'pages', pageId).withParam('edittime', editTime).del();
    }
    reorderPage(pageId, afterId, editTime) {
        return this._plug.at(`=${this._name}`, 'pages', pageId, 'order').withParams({ edittime: editTime, afterId: afterId }).post().then(learningPathModel.parse);
    }
}
export class LearningPathManager {
    constructor(settings) {
        this.settings = settings;
        this._plug = new Plug(settings).at('@api', 'deki', 'learningpaths');
    }
    getLearningPaths() {
        return this._plug.get().then(learningPathModel.parse);
    }
    getLearningPath(name) {
        return new LearningPath(name, this.settings);
    }
    create(data) {
        if(data.summary.length > maxSummaryCount) {
            data.summary = data.summary.substring(0, maxSummaryCount);
        }
        return this._plug.withParams(data).post().then(learningPathModel.parse);
    }
}
