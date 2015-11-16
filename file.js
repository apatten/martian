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
export default class PageFile {

    /**
     * Construct a new PageFile object
     * @param {string|number} id The Page ID.
     * @param {Object} params Default request parameters.  Can be overridden in the getData() call.
     * @constructor
     */
    constructor(id, params, mode) {
        this._id = id || 0;
        this.defaultParams = params;
        this._mode = mode;
        this._page = this._getPage(id);
    }
    _getPage(id) {
        return new Page(id);
    }
    _getPagePlug() {
        return this._page.getPlug();
    }
    setId(id) {
        this._id = id;
        this._page = this._getPage(id);
    }

    /**
     * Get the files for a page.
     * @param {Object} options Options that override the defaults given to the constructor.
     * @returns {*} A promise that is resolved or rejected when the request is done.
     */
    getData(options) {
        var def = new $.Deferred();
        var self = this;
        options = options || {};
        self._getPagePlug().at('files').withParams(_(options).defaults(self.defaultParams)).get(function(response) {
            if(response.isSuccess()) {
                var data = response.getJson();
                if(data['@count'] === '0') {
                    data.file = [];
                }
                def.resolve(_(data.file).isArray() ? data.file : [ data.file ]);
            } else {
                def.reject(response.getStatusText());
            }
        });
        return def.promise();
    }

    /**
     * @deprecated getPageFiles() is deprecated.  Please call getData() instead.
     */
    getPageFiles(callback, options) {
        callback = callback || function() {};
        options = options || {};
        this._getPagePlug().at('files').withParams(options).get(function(response) {
            if(response.isSuccess()) {
                var data = response.getJson();
                callback({ success: true, data: data });
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.pageFiles.listingFetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }
}
