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
import modelHelper from './modelHelper';
let pageTagsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: parseInt(obj['@count'], 10),
            href: obj['@href']
        };
        if('tag' in obj) {
            parsed.tags = [];
            let tags = Array.isArray(obj.tag) ? obj.tag : [ obj.tag ];
            tags.forEach((tag) => {
                parsed.tags.push({
                    value: tag['@value'],
                    id: parseInt(tag['@id'], 10),
                    href: tag['@href'],
                    title: tag.title,
                    type: tag.type,
                    uri: tag.uri
                });
            });
        }
        return parsed;
    }
};
export default pageTagsModel;
