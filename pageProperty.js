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
import settings from './settings';
import pageModel from './models/page.model';
import subpagesModel from './models/subpages.model';
export default class PageHierarchy {
    constructor() {
        this.filterByArticleTypes = [];
        this._plug = new Plug().withHost(settings.get('host')).at('@api', 'deki', 'pages');
    }
    getRoot(id = 'home') {
        return this._plug.at(id).get().then(pageModel.parse);
    }
    getChildren(id = 'home') {
        let subpagesPlug = this._plug.at(id, 'subpages');
        if(this.filterByArticleTypes.length > 0) {
            subpagesPlug = subpagesPlug.withParam('article', this.filterByArticleTypes.join(','));
        }
        return subpagesPlug.get().then(subpagesModel.parse).then(spModel => {
            return spModel.pageSubpage || [];
        });
    }
    getRootAndChildren(id, asArray = true) {
        return Promise.all([
            this.getRoot(id),
            this.getChildren(id)
        ]).then((values) => {
            let root = values[0];
            let children = values[1];
            root.subpages = children.length > 0;
            if(asArray) {
                root = [ root ];
            }
            return root;
        });
    }
}
