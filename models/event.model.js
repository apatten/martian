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
export let eventModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            id: obj['@id'],
            datetime: modelHelper.getDate(obj['@datetime']),
            type: obj['@type'],
            journaled: modelHelper.getBool(obj['@journaled']),
            version: modelHelper.getInt(obj['@version']),
            requestId: obj.request['@id']
        };
        if('@language' in obj) {
            parsed.language = obj['@language'];
        }
        modelHelper.addIfDefined(obj.page, 'page', parsed, pageModel);
        if('user' in obj) {
            parsed.user = { id: obj.user['@id'] };
            if('name' in obj.user) {
                parsed.user.name = obj.user.name;
            }
        }
        if('data' in obj) {
            if(parsed.type === 'user:search') {
                parsed.data = {
                    constraint: obj.data.constraint,
                    path: obj.data.path,
                    query: obj.data.query,
                    limit: modelHelper.getInt(obj.data.limit),
                    qid: modelHelper.getInt(obj.data.qid),
                    totalrecommended: modelHelper.getInt(obj.data.totalrecommended),
                    totalresults: modelHelper.getInt(obj.data.totalresults)
                };
            } else {

                // The only other type possible here is 'page:view'
                parsed.data = {
                    host: obj.data['_uri.host'],
                    query: obj.data['_uri.query'],
                    scheme: obj.data['_uri.scheme']
                };
            }
        }
        return parsed;
    }
};
