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
import Plug from './lib/plug';
import utility from './lib/utility';
import pagePropertiesModel from './models/pageProperties.model';
import pagePropertyModel from './models/pageProperty.model';
export default class PageProperty {
    constructor(id = 'home') {
        this._id = utility.getResourceId(id, 'home');
        this._plug = new Plug().at('@api', 'deki', 'pages', this._id, 'properties');
    }
    getProperties(names = []) {
        if(!Array.isArray(names)) {
            return Promise.reject(new Error('The property names must be an array'));
        }
        let plug = this._plug;
        if(names.length > 0) {
            plug = plug.withParams({ names: names.join(',') });
        }
        return plug.get().then(pagePropertiesModel.parse);
    }
    getProperty(key) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch a page property without providing a property key'));
        }
        return this._plug.at(encodeURIComponent(key), 'info').get().then(pagePropertyModel.parse);
    }
    getPropertyContents(key) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch a page property contents without providing a property key'));
        }
        return this._plug.at(encodeURIComponent(key)).get();
    }
    getPropertyForChildren(key, depth = 1) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch properties for children without providing a property key'));
        }
        return this._plug.withParams({ depth: depth, names: key }).get();
    }
}
