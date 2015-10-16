/**
 * MindTouch Core JS API
 * Copyright (C) 2006-2015 MindTouch, Inc.
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
import Plug from './plug';
import utility from './lib/utility';
import fileModel from './models/file.model';
import fileRevisionsModel from './models/fileRevisions.model';
export default class File {
    constructor(id) {
        this._plug = new Plug().at('@api', 'deki', 'files', id).withParam('draft', true); // isDraftRequest);
    }
    getInfo() {
        return this._plug.at('info').get().then(fileModel.parse);
    }
    getRevisions() {
        return this._plug.at('revisions').get().then(fileRevisionsModel.parse);
    }
    setDescription(description) {
        return this._plug.at('description').put(description, utility.textRequestType).then(fileModel.parse);
    }
    delete() {
        return this._plug.delete();
    }
}
