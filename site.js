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
import {utility} from './lib/utility';
import {stringUtility} from './lib/stringUtility';
import {Plug} from './lib/plug';
import {searchModel} from './models/search.model';
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
    return '+(' + constraints.join(' ') + ')';
}
export class Site {
    constructor(settings) {
        this.plug = new Plug(settings).at('@api', 'deki', 'site');
    }
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
    search({ page: page = 1, limit: limit = 10, tags: tags = '', q: q = '', path: path = '', recommendations = true } = {}) {
        let constraint = {};
        if(path !== '') {
            constraint.path = path;
        }
        if(tags !== '') {
            constraint.tags = tags;
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
        return this.plug.at('query').withParams(searchParams).get().then(searchModel.parse);
    }
}
