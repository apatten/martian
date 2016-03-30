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
import {Plug} from './lib/plug';
import {pageModel} from './models/page.model';
import {subpagesModel} from './models/subpages.model';

/**
 * A class for fetching hierarchy information.
 */
export class PageHierarchy {

    /**
     * Construct a new PageHierarchy object.
     * @param {Array} [articleTypes=[]] - An array of article types to filter by when fetching pages in the hierarchy.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(articleTypes = [], settings) {
        this.filterByArticleTypes = articleTypes;
        this._plug = new Plug(settings).at('@api', 'deki', 'pages');
    }

    /**
     * Get the root of the hierarchy based on the page with {@see id}.
     * @param {Number|String} [id='home'] - The identifier of the page to use as the hierarchy root.
     * @returns {Promise.<pageModel>} - A Promise that, when resolved, yields a {@link pageModel} containing the root page information.
     */
    getRoot(id = 'home') {
        return this._plug.at(id).get().then(pageModel.parse);
    }

    /**
     * Get children of the page as an Array.
     * @param {Number|String} [id='home'] - The identifier of the page to use as the hierarchy root.
     * @returns {Promise.<Array>} - A Promise that, when resolved, yields the array of child pages of the identified root.
     */
    getChildren(id = 'home') {
        let subpagesPlug = this._plug.at(id, 'subpages');
        if(this.filterByArticleTypes.length > 0) {
            subpagesPlug = subpagesPlug.withParam('article', this.filterByArticleTypes.join(','));
        }
        return subpagesPlug.get().then(subpagesModel.parse).then((spModel) => {
            return spModel.pageSubpage || [];
        });
    }

    /**
     * Gets a root page and its children.
     * @param {Number|String} [id='home'] - The identifier of the page to use as the hierarchy root.
     * @param {Boolean} [asArray=true] - Force the result to be wrapped as an Array.
     * @returns {Promise.<Array|Object>} - A Promise that, when resolved, yields an Object or Array, depending on the value of {@see asArray}.
     */
    getRootAndChildren(id, asArray = true) {
        return Promise.all([
            this.getRoot(id),
            this.getChildren(id)
        ]).then(([ root, children ]) => {
            root.subpages = children.length > 0;
            if(asArray) {
                root = [ root ];
            }
            return root;
        });
    }
}
