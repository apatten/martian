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
import { modelHelper } from './modelHelper';
import { pageRatingModel } from './pageRating.model';
import { userModel } from './user.model';
let pageModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            id: modelHelper.getInt(obj['@id'])
        };
        modelHelper.addIfDefined(obj.title, 'title', parsed);
        modelHelper.addIfDefined(obj['uri.ui'], 'uriUi', parsed);
        modelHelper.addIfDefined(obj['@href'], 'href', parsed);
        modelHelper.addIfDefined(obj['@state'], 'state', parsed);
        modelHelper.addIfDefined(obj['@draft.state'], 'draftState', parsed);
        modelHelper.addIfDefined(obj.article, 'article', parsed);
        modelHelper.addIfDefined(obj.language, 'language', parsed);
        modelHelper.addIfDefined(obj.namespace, 'namespace', parsed);
        modelHelper.addIfDefined(obj['language.effective'], 'languageEffective', parsed);
        modelHelper.addIfDefined(obj.timeuuid, 'timeuuid', parsed);
        if('path' in obj) {
            parsed.path = modelHelper.getString(obj.path);
        }
        if('@revision' in obj) {
            parsed.revision = modelHelper.getInt(obj['@revision']);
        }
        if('date.created' in obj) {
            parsed.dateCreated = modelHelper.getDate(obj['date.created']);
        }
        if('@deleted' in obj) {
            parsed.deleted = modelHelper.getBool(obj['@deleted']);
        }
        if('@publish' in obj) {
            parsed.publish = modelHelper.getBool(obj['@publish']);
        }
        if('@unpublish' in obj) {
            parsed.unpublish = modelHelper.getBool(obj['@unpublish']);
        }
        if('@deactivate' in obj) {
            parsed.deactivate = modelHelper.getBool(obj['@deactivate']);
        }
        if('@virtual' in obj) {
            parsed.virtual = modelHelper.getBool(obj['@virtual']);
        }
        if('date.modified' in obj) {
            parsed.dateModified = modelHelper.getDate(obj['date.modified']);
        }
        if('date.edited' in obj) {
            parsed.dateEdited = modelHelper.getDate(obj['date.edited']);
        }
        if('page.parent' in obj) {
            parsed.pageParent = pageModel._getParents(obj['page.parent']);
        }
        if('rating' in obj) {
            parsed.rating = pageRatingModel.parse(obj.rating);
        }
        if('user.author' in obj) {
            parsed.userAuthor = userModel.parse(obj['user.author']);
        }

        // TODO: Parse obj.files if defined
        // TODO: Parse obj.content if defined
        // TODO: Parse obj.properties if defined
        // TODO: Parse obj['user.createdby'] if defined

        // Only parse subpages if the property exists, and it has a 'page'
        //  sub-property.
        if('subpages' in obj && typeof obj.subpages !== 'string' && 'page' in obj.subpages) {
            parsed.subpages = pageModel._getSubpages(obj.subpages);
        }
        return parsed;
    },
    _getParents(parent) {
        return pageModel.parse(parent);
    },
    _getSubpages(subpages) {
        let pageDef = subpages.page;
        let parsed = [];
        pageDef = modelHelper.getArray(pageDef);
        pageDef.forEach((sp) => {
            parsed.push(pageModel.parse(sp));
        });
        return parsed;
    }
};
export { pageModel };
