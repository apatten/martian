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
import {modelHelper} from './modelHelper';
import {pageModel} from './page.model';
import {userModel} from './user.model';
let draftModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            state: obj['@state'],
            href: obj['@href'],
            uriUi: obj['uri.ui']
        };
        if('@id' in obj) {
            parsed.id = modelHelper.getInt(obj['@id']);
        }
        if('@publish' in obj) {
            parsed.publish = modelHelper.getBool(obj['@publish']);
        }
        if('@deactivate' in obj) {
            parsed.deactivate = modelHelper.getBool(obj['@deactivate']);
        }
        modelHelper.addIfDefined(obj.title, 'title', parsed);
        modelHelper.addIfDefined(obj.timeuuid, 'timeuuid', parsed);
        modelHelper.addIfDefined(obj['@revision'], 'revision', parsed);
        if('date.modified' in obj) {
            parsed.dateModified = modelHelper.getDate(obj['date.modified']);
        }
        if('date.edited' in obj) {
            parsed.dateEdited = modelHelper.getDate(obj['date.edited']);
        }
        if('page.parent' in obj) {
            parsed.pageParent = pageModel.parse(obj['page.parent']);
        }
        if('user.createdby' in obj) {
            parsed.userCreatedBy = userModel.parse(obj['user.createdby']);
        }
        if('user.author' in obj) {
            parsed.userAuthor = userModel.parse(obj['user.author']);
        }
        return parsed;
    }
};
export {draftModel};
