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
import Plug from './deki.plug';
import utility from './deki.utility';
import events from './ui.events';
import settings from './settings';
export default class Page {

    /**
     * @constructor
     */
    constructor(id) {

        /**
         * @private
         */
        this._id = 0;
        this._draft = null;
        if(_(id).isNumber()) {
            this._id = id;
        } else {
            var idNumber = Number(id);
            if(!_(idNumber).isNaN()) {

                // The id was successfully parsed as a number.  Use that.
                this._id = idNumber;
            } else if(_(id).isString()) {

                // The id is a non-number string.  Assume it's a page path.
                this._id = (id.toLowerCase() === 'home') ? 'home' : '=' + encodeURIComponent(id);
            }
        }

        this._pagePlug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'pages').withParam('dream.out.format', 'json');
        this._historyPlug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'events', 'page').withParam('dream.out.format', 'json');
    }
    getPlug() {
        return this._pagePlug.at(this._id);
    }
    getHistoryPlug() {
        return this._historyPlug.at(this._id);
    }
    _doGet(atParam, errorType, callback, params) {
        var def = new $.Deferred();
        if(_(callback).isFunction()) {
            params = params || {};
        } else if(!callback || _(callback).isObject()) {
            params = callback || {};
            callback = utility.finishDeferred(def);
        } else {
            throw 'Error: The callback parameter must be an object or function';
        }
        this._pagePlug.at(this._id, atParam).withParams(params).get(function(response) {
            if(response.isSuccess()) {
                var data = null;
                try {
                    data = JSON.parse(response.responseText);
                } catch(e) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.response.parse',
                            status: response.getStatusText()
                        }
                    });
                    return;
                }
                callback({ success: true, data: data });
            } else {
                callback({
                    success: false,
                    error: {
                        type: errorType,
                        status: response.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
    setId(id) {
        this._id = id;
    }
    getFullInfo(callback, params) {
        var def = new $.Deferred();
        if(_(callback).isFunction()) {
            params = params || {};
        } else if(!callback || _(callback).isObject()) {
            params = callback || {};
            callback = utility.finishDeferred(def);
        } else {
            throw 'Error: The second parameter to getHtmlTemplate must be an object or function';
        }
        this.getPlug().get(function(response) {
            if(response.isSuccess()) {
                var data = null;
                try {
                    data = JSON.parse(response.responseText);
                } catch(e) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.response.parse',
                            status: response.getStatusText()
                        }
                    });
                    return;
                }
                callback({ success: true, info: data });
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.fullInfo.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
    getInfo(callback, params) {
        var defaultParam = { exclude: 'revision' };
        if(!params && _(callback).isObject()) {
            callback = (callback) ? _(callback).defaults(defaultParam) : defaultParam;
        } else {
            params = (params) ? _(params).defaults(defaultParam) : defaultParam;
        }
        return this._doGet('info', 'error.simpleInfo.fetch', callback, params);
    }
    getContents(callback, params) {
        return this._doGet('contents', 'error.contents.fetch', callback, params);
    }
    getSubpages(callback, params) {
        return this._doGet('subpages', 'error.subpages.fetch', callback, params);
    }
    getTree(callback, params) {
        return this._doGet('tree', 'error.tree.fetch', callback, params);
    }
    getTreeIds() {
        var def = new $.Deferred();
        this._pagePlug.at(this._id, 'tree').withParams({ format: 'ids' }).get(function(response) {
            if(response.isSuccess()) {
                def.resolve(_(response.responseText).words(','));
            } else {
                def.reject(response.getError());
            }
        });
        return def.promise();
    }
    getTags(callback, params) {
        return this._doGet('tags', 'error.tags.fetch', callback, params);
    }

    /**
    * Query a Template to fetch a JSON-encoded object.
    * @param {string} template The path to the template to fetch.
    * @param {function} callback Function that is called after the fetch succeeds.
    * @param {Object} params An optional map of query string params to send along to the template.  The pageid parameter
    *               that signals the Template to be rendered does not need to be included.  The ID of the Page
    *               object will be used automatically.
    */
    getJsonTemplate(template, callback, params) {
        params = params || {};
        callback = callback || function() {};
        var pagePath = '=' + encodeURIComponent(encodeURIComponent(template));
        var fullParams = _(params).extend({
            pageid: this._id.toString(),
            format: 'text'
        });
        this._pagePlug.at(pagePath, 'contents').withParams(fullParams).get(function(response) {
            if(response.isSuccess()) {
                try {
                    var obj = JSON.parse(response.responseText);
                    callback({ success: true, data: obj });
                } catch(e) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.template.json.parse',
                            status: response.getStatusText()
                        }
                    });
                }
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.template.json.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }
    getHtmlTemplate(template, callback, params) {
        var def = new $.Deferred();
        if(_(callback).isFunction()) {
            params = params || {};
        } else if(!callback || _(callback).isObject()) {
            params = callback || {};
            callback = utility.finishDeferred(def);
        } else {
            throw 'Error: The second parameter to getHtmlTemplate must be an object or function';
        }
        var pagePath = '=' + encodeURIComponent(encodeURIComponent(template));
        var fullParams = _(params).extend({
            pageid: this._id.toString()
        });
        this._pagePlug.at(pagePath, 'contents').withParams(fullParams).get(function(response) {
            if(response.isSuccess()) {
                var data = response.getJson();
                callback({ success: true, data: data });
                $(document).trigger(events.Template.Loaded);
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.template.html.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
    logPageView() {
        var def = new $.Deferred();
        var eventPlug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'events', 'page-view', this._id)
            .withParam('uri', encodeURIComponent(document.location.href));
        eventPlug.post(JSON.stringify({ _uri: document.location.href }), utility.jsonRequestType, function(response) {
            if(response.isSuccess()) {
                def.resolve();
                $(document).trigger(events.Template.Loaded);
            } else {
                def.reject({ error: { type: 'error.template.html.fetch', status: response.getStatusText() }});
            }
        });
        return def.promise();
    }
    getOverview() {
        var def = new $.Deferred();
        this.getPlug().at('overview').get(function(resp) {
            if(resp.isSuccess()) {
                def.resolve(resp.getJson());
            } else {
                def.reject({
                    error: {
                        type: 'error.overview.fetch',
                        status: resp.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
    getUserRating() {
        var def = new $.Deferred();
        this._pagePlug.at(this._id, 'ratings').get(function(response) {
            if(response.isSuccess()) {
                var data = response.getJson();
                if('user.ratedby' in data) {
                    def.resolve(data['user.ratedby']);
                } else {
                    def.resolve({});
                }
            } else {
                def.reject({
                    error: {
                        type: 'error.userrating.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
    rate(rating) {
        var def = new $.Deferred();
        this._pagePlug.at(this._id, 'ratings').withParams({ score: rating }).post(utility.textRequestType, '', function(response) {
            if(response.isSuccess()) {
                def.resolve();
            } else {
                def.reject({
                    error: {
                        type: 'error.userrating.set',
                        status: response.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
    pdf(options) {
        var def = new $.Deferred();
        options.dryrun = (options.dryrun === false) ? options.dryrun : true;
        this._pagePlug.at(this._id, 'pdf').withParams(options).get(function(resp) {
            if(resp.isSuccess()) {
                if(!_(resp.responseText).isEmpty() && options.dryrun) {
                    def.resolve(JSON.parse(resp.responseText));
                } else {
                    def.resolve();
                }
            } else {
                var error = { };
                if(resp.status === 400) {
                    error.type = 'export.too-many-pages';
                    error.info = JSON.parse(resp.responseText);
                } else {
                    error.type = 'export.general';
                }
                def.reject(error);
            }
        });
        return def.promise();
    }
    getRelated(params) {
        var def = new $.Deferred();
        this.getPlug().at('related').withParams(params).get(function(resp) {
            if(resp.isSuccess()) {
                def.resolve(resp.getJson());
            } else {
                def.reject({
                    error: {
                        type: 'error.related.fetch',
                        status: resp.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
}
