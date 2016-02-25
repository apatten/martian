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

import {LearningPath} from './learningPath';
import {pageModel} from './models/pageModel';
let saveTemplate = `<learningpath>
    <title>{{title}}</title>
    <summary>{{summary}}</summary>
    <category>{{category}}</category>
    {{#pages}}
        <pages>{{id}}</pages>
    {{/pages}}
</learningpath>`;
export class LearningPathPro extends LearningPath {
    static create(data) {
        if(data.summary.length > maxSummaryCount) {
            data.summary = data.summary.substring(0, maxSummaryCount);
        }
        return this._plug.withParams(data).post().then(learningPathModel.parse);
    }

    // constructor
    constructor(name, settings) {
        super(name, settings);
    }

    // learning path operations
    update(content) {
        if(content.summary && content.summary.length > maxSummaryCount) {
            content.summary = content.summary.substring(0, maxSummaryCount);
        }
        let XMLData = mustache.render(saveTemplate, content);
        return this._plug.at(`=${this._name}`).withParam('edittime', content.edittime).post(XMLData, 'application/xml').then(learningPathModel.parse);
    }
    remove() {
        return this._plug.at(`=${this._name}`).del();
    }

    // Page operations
    addPage(pageId, editTime) {
        return this._plug.at(`=${this._name}`, 'pages', pageId).withParams({ edittime: editTime }).then(pageModel.parse);
    }
    removePage(pageId, editTime) {
        return this._plug.at(`=${this._name}`, 'pages', pageId).withParams({ edittime: editTime }).del();
    }
    reorderPage(pageId, afterId, editTime) {
        return this._plug.at(`=${this._name}`, 'pages', pageId, 'order').withParams({ edittime: editTime, afterId: afterId }).post().then(learningPathModel.parse());
    }
}
