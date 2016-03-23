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
import {fileModel} from './models/file.model';
export class PageFileBase {
    constructor(pageId, filename) {
        if(this.constructor.name === 'PageFileBase') {
            throw new TypeError('PageFileBase must not be constructed directly.  Use one of PageFile() or DraftFile()');
        }
        this._pageId = utility.getResourceId(pageId, 'home');
        this._filename = utility.getFilenameId(filename);
    }
    getFileUri() {
        return this._plug.getUrl();
    }
    getInfo() {
        return this._plug.at('info').get().then(fileModel.parse);
    }
    delete() {
        return this._plug.del();
    }
    getDescription() {
        return this._plug.at('description').get();
    }
    clearDescription() {
        return this._plug.at('description').del();
    }
    updateDescription(description = '') {
        return this._plug.at('description').put(description, utility.textRequestType).then(fileModel.parse);
    }
}
