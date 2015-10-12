/**
 * MindTouch martian
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

import modelHelper from './modelHelper';
import Time from 'lib/time';
let subpagesModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            totalcount: parseInt(obj['@totalcount']),
            count: parseInt(obj['@count']),
            href: obj['@href']
        };
        if(parsed.count > 0) {
            let objSubpages = obj['page.subpage'];
            if(objSubpages) {
                let subpages = Array.isArray(objSubpages) ? objSubpages : [ objSubpages ];
                parsed.pageSubpage = [];
                subpages.forEach(sp => {
                    parsed.pageSubpage.push({
                        id: parseInt(sp['@id']),
                        href: sp['@href'],
                        deleted: modelHelper.getBool(sp['@deleted']),
                        subpages: modelHelper.getBool(sp['@subpages']),
                        dateCreated: new Time(sp['date.created']),
                        language: sp.language,
                        namespace: sp.namespace,
                        path: modelHelper.getString(sp.path),
                        title: sp.title,
                        uriUi: sp['uri.ui']
                    });
                });
            }
        }
        return parsed;
    }
};
export default subpagesModel;
