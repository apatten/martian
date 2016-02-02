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
import {groupModel} from './group.model';
let groupListModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: obj['@count'],
            querycount: obj['@querycount'],
            totalcount: obj['@totalcount'],
            href: obj['@href']
        };
        if('group' in obj) {
            parsed.group = [];
            let groups = Array.isArray(obj.group) ? obj.group : [ obj.group ];
            groups.forEach((group) => {
                parsed.group.push(groupModel.parse(group));
            });
        }
        return parsed;
    }
};
export {groupListModel};
