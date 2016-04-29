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
import { utility } from './lib/utility';
import { stringUtility } from './lib/stringUtility';
import { Plug } from './lib/plug';
import { modelParser } from './lib/modelParser';
import { searchModel } from './models/search.model';

function _buildSearchConstraints(params) {
    let constraints = [];
    params.namespace = 'main';
    constraints.push('+namespace:' + utility.searchEscape(params.namespace));
    if('path' in params) {
        let path = params.path;
        if(stringUtility.startsWith(path, '/')) {
            path = stringUtility.leftTrim(path, '/');
        }
        constraints.push('+path.ancestor:' + utility.searchEscape(path));
    }
    if('tags' in params) {
        var tags = params.tags;
        if(typeof tags === 'string' && (tags)) {
            tags = tags.split(',');
        }
        tags.forEach((tag) => {
            constraints.push('+tag:"' + utility.searchEscape(tag) + '"');
        });
    }
    if('type' in params) {
        var types = params.type;
        if(typeof types === 'string' && (types)) {
            types = types.split(',');
        }
        types.forEach((type) => {
            constraints.push('+type:' + utility.searchEscape(type));
        });
    }
    return '+(' + constraints.join(' ') + ')';
}

/**
 * A class for administering aspects of a MindTouch site.
 */
export class Site {

    /**
     * Construct a Site object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings) {
        this.plug = new Plug(settings).at('@api', 'deki', 'site');
    }

    /**
     * Get the localized string corresponding to the supplied resource key.
     * @param {Object} options - Options to direct the fetching of the localized string.
     * @param {String} options.key - The key that identifies the string to fetch.
     * @param {String} [options.lang] - A language code used to fetch the string in a specific language.  If not supplied, the current system language will be used.
     * @returns {Promise.<String>} - A Promise that, when resolved, yields the fetched string.
     */
    getResourceString(options = {}) {
        if(!('key' in options)) {
            return Promise.reject('No resource key was supplied');
        }
        let locPlug = this.plug.at('localization', options.key);
        if('lang' in options) {
            locPlug = locPlug.withParam('lang', options.lang);
        }
        return locPlug.get();
    }

    /**
     * Perform a search across the site.
     * This function takes a single parameter with the following options.
     * @param {Number} [page=1] The paginated page number offset to return.
     * @param {Number} [limit=10] - Limit search results to the specified number of items per paginated page.
     * @param {String} [tags=''] - A comma-separated list of tags to constrain search results to items containing one of the tags.
     * @param {String} [type=''] - Type or types to filter the results in a comma delimited list.  Valid types: `wiki`, `document`, `image`, `binary`
     * @param {String} [q=''] - Search keywords or advanced search syntax.
     * @param {String} [path=''] - A page path to constrain the search results to items located under the specified path.
     * @param {Boolean} [recommendations=true] - `true` to include recommended search results based off site configuration. `false` to suppress them.
     * @returns {Promise.<searchModel>} - A Promise that, when resolved, yields the results from the search in a {@link searchModel}.
     */
    search({ page: page = 1, limit: limit = 10, tags: tags = '', type: type = '', q: q = '', path: path = '', recommendations = true } = {}) {
        let constraint = {};
        if(path !== '' && path !== '/') {
            constraint.path = path;
        }
        if(tags !== '') {
            constraint.tags = tags;
        }
        if(type !== '') {
            constraint.type = type;
        }
        let searchParams = {
            limit: limit,
            page: page,
            offset: (parseInt(limit, 10) * (parseInt(page, 10) - 1)),
            sortBy: '-date,-rank',
            q: q,
            summarypath: encodeURI(path),
            constraint: _buildSearchConstraints(constraint),
            recommendations: recommendations
        };
        let searchModelParser = modelParser.createParser(searchModel);
        return this.plug.at('query').withParams(searchParams).get().then(searchModelParser);
    }
}
