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
import { Plug } from 'mindtouch-http';
import { Settings } from './lib/settings';
import { utility } from './lib/utility';
import { modelParser } from './lib/modelParser';
import { pagePropertiesModel } from './models/pageProperties.model';
import { pagePropertyModel } from './models/pageProperty.model';

/**
 * A class for managing the properties of a page.
 */
export class PageProperty {

    /**
     * Construct a new PageProperty object.
     * @param {Number|String} [id='home'] The numeric page ID or the page path.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id = 'home', settings = new Settings()) {
        this._id = utility.getResourceId(id, 'home');
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages', this._id, 'properties');
    }

    /**
     * Get all of the properties of the page.
     * @param {Array} [names=[]] - An array of names to fetch so that the results are filtered.
     * @returns {Promise.<pagePropertiesModel>} - A Promise that, when resolved, yields a {@link pagePropertiesModel} object that contains the listing of properties.
     */
    getProperties(names = []) {
        if(!Array.isArray(names)) {
            return Promise.reject(new Error('The property names must be an array'));
        }
        let plug = this._plug;
        if(names.length > 0) {
            plug = plug.withParams({ names: names.join(',') });
        }
        let pagePropertiesModelParser = modelParser.createParser(pagePropertiesModel);
        return plug.get().then(pagePropertiesModelParser);
    }

    /**
     * Gets a single page property by property key.
     * @param {String} key - The key of the property to fetch.
     * @returns {Promise.<pagePropertyModel>} - A Promise that, when resolved, yields a {@link pagePropertyModel} object that contains the property information.
     */
    getProperty(key) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch a page property without providing a property key'));
        }
        let pagePropertyModelParser = modelParser.createParser(pagePropertyModel);
        return this._plug.at(encodeURIComponent(key), 'info').get().then(pagePropertyModelParser);
    }

    /**
     * Get the contents of a page property.
     * @param {String} key - The key of the property to fetch.
     * @returns {Promise} - A Promise that, when resolved, yields the property contents.  The property can be of any type allowed by the MindTouch property subsystem.
     */
    getPropertyContents(key) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch a page property contents without providing a property key'));
        }
        return this._plug.at(encodeURIComponent(key)).get();
    }

    /**
     * Get a listing of page properties for a hierarchy of pages.
     * @param {String} key - The key of the property to fetch.
     * @param {Number} [depth=1] - Between 0 and 2 levels deep in the search are allowed. If depth is 1 or 2, the names argument only can be a single property to be looked up, and no wildcards are allowed.
     * @returns {Promise} - A Promise that, when resolved, yields the listing of the properties.
     */
    getPropertyForChildren(key, depth = 1) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch properties for children without providing a property key'));
        }
        return this._plug.withParams({ depth: depth, names: key }).get();
    }
}
