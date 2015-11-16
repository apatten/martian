/*
 * MindTouch API - javascript api for mindtouch
 * Copyright (c) 2013 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * For community documentation and downloads visit developer.mindtouch.com;
 * please review the licensing section.
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
import Page from './page';
import utility from './deki.utility';
export default class PageProperty {

    /**
    * @constructor
     */
    constructor(id) {
        this._id = id || 0;
        this._page = this._getPage(id);
    }
    _getPage(id) {
        return new Page(id);
    }
    _getPlug() {
        return this._page.getPlug().at('properties');
    }
    setId(id) {
        this._id = id;
        this._page = this._getPage(id);
    }

    /**
    * Get the list of properties for the current page ID.
    * @param {function} [callback] A function that will be called when the page's properties have been fetched fron the API, or when an error occcurs.
    * @param {Array.<string>} [names] An array of names of properties to return. Use '*' at the start or end of a name for wildcard matches.  Defaults to all properties if null or not passed in.
    * @param {number} [maxContentSize] An integer specifying the maximum length of content to return.  Defaults to 2048 bytes if null or not passed in.
    * @param {number} [depth] The number of levels that we can go deep in search of children. The valid values are between 0 and 2. Defaults to 0.
    */
    getProperties(callback, names, maxContentSize, depth) {
        callback = callback || function() {};
        var params = { };
        if(depth) {
            params.depth = depth;
        }
        if(maxContentSize) {
            params.contentcutoff = maxContentSize;
        }
        var namesParam = '';
        if(names && _.isArray(names) && names.length > 0) {
            for(var i = 0; i < names.length; i++) {
                namesParam += names[i] + ',';
            }
        }
        params.names = namesParam;
        this._getPlug().withParams(params).get(function(response) {
            if(response.isSuccess()) {
                var data = response.getJson();
                callback({ success: true, data: data });
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.property.jsonFetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }

    /**
    * Get a page property object based on a supplied key.
    * @param {string} key The desired property's key.
    * @param {function} [callback] A function to be called once the request is complete.
     */
    getProperty(key, callback, options) {
        this.getProperties(callback, [ key ], null, null, options);
    }
    getPageProperties(opts) {
        var def = new $.Deferred();
        var params = {};
        if(opts.depth) {
            params.depth = opts.depth;
        }
        if(opts.maxContentSize) {
            params.contentcutoff = opts.maxContentSize;
        }
        if(opts.names.length > 0) {
            params.names = opts.names.toString();
        }
        this._getPlug().withParams(params).get(function(response) {
            if(response.isSuccess()) {
                def.resolve(response.getJson());
            } else {
                def.reject({
                    error: {
                        type: 'error.property.jsonFetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }

    /**
    * Get a page property that is known to be a valid JSON string.
    * @param {string} key The property key that contains the JSON string.
    * @param {function} callback The function that will be called when the request is complete.  If the string fetched in not valid JSON, the callback will contain success = false.
     */
    getRawProperty(key, callback) {
        callback = callback || function() {};
        this._getPlug().at(key).get(function(resp) {
            if(resp.isSuccess()) {
                callback({ success: true, contents: resp.responseText });
            } else {
                callback({
                    success: false,
                    error: { type: 'error.property.jsonFetch' }
                });
            }
        });
    }

    /**
     * Get a property stored as a JSON string and parse it before returning.
     * @param {string} key The property key to fetch.
     * @param {function} callback A function that will be called to report success or failure and supply the parsed javascript
     *                 object to the caller.
     */
    getJsonProperty(key, callback) {
        var def = new $.Deferred();
        callback = callback || utility.finishDeferred(def);
        this.getRawProperty(key, function(response) {
            if(response.success) {
                var data = JSON.parse(response.contents);
                callback({ success: true, data: data });
            } else {
                callback(response);
            }
        });
        return def.promise();
    }
}
