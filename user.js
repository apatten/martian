/*
 * MindTouch API - javascript api for mindtouch
 * Copyright (c) 2010 MindTouch Inc.
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
import settings from './settings';
export default class User {
    constructor(id) {
        this._id = id || 0;
    }
    static getUserPlug() {
        if(!this._userPlug) {
            this._userPlug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'users').withParam('dream.out.format', 'json');
        }
        return this._userPlug;
    }
    static searchUsers(searchCriteria) {
        searchCriteria = searchCriteria || {};
        var requestDef = $.Deferred();
        User.getUserPlug().at('search').withParams(searchCriteria).get(function(response) {
            if(response.isSuccess()) {
                var data = null;
                try {
                    data = response.getJson();
                } catch(e) {
                    requestDef.reject({
                        error: {
                            type: 'error.users.search.parse',
                            status: response.getStatusText()
                        }
                    });
                    return;
                }
                if(!data) {
                    requestDef.reject({
                        error: {
                            type: 'error.users.search.fetch',
                            status: response.getStatusText()
                        }
                    });
                    return;
                }
                if(data.user && !_(data.user).isArray()) {
                    data.user = [ data.user ];
                }
                requestDef.resolve({ data: data });
            } else {
                var errorResponse = null;
                try {
                    errorResponse = response.getJson();
                } catch(e) {}
                var res = errorResponse || {};
                requestDef.reject({
                    error: {
                        response: res,
                        type: (response.statusText === 'timeout') ? 'error.users.search.timeout'
                            : res['@error-code'] || 'error.users.search.generic',
                        status: response.getStatusText()
                    }
                });
            }
        }, null, { timeout: 30000 });
        return requestDef.promise();
    }
    static getCurrentUser(excludes) {
        var self = this;
        var def = new $.Deferred();
        var plug = User.getUserPlug().at('current');
        if(excludes && _(excludes).isArray() && excludes.length) {
            plug = plug.withParam('exclude', excludes.join());
        }
        plug.get(function(response) {
            if(response.isSuccess()) {
                var user = self.newUserFromResponseJSON(response.getJson());
                def.resolve(user);
            } else {
                def.reject({ error: { type: 'error.user.get', status: response.getStatusText() }});
            }
        });
        return def.promise();
    }
    static newUserFromResponseJSON(responseJSON) {
        return new User(responseJSON['@id']);
    }
    isAnonymous() {
        return parseInt(this._id, 10) === 2;
    }
    getProperties(callback) {
        callback = callback || function() {};
        User.getUserPlug().at(this._id, 'properties').get(function(response) {
            if(response.isSuccess()) {
                var data = null;
                try {
                    data = response.getJson();
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
                if(!data) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.response.fetch',
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
                        type: 'error.response.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }
    getProperty(property, callback) {
        callback = callback || function() {};
        User.getUserPlug().at(this._id, 'properties', property).get(function(response) {
            if(response.isSuccess()) {
                callback({ success: true, contents: response.responseText });
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.property.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }
    getJsonProperty(property, callback) {
        callback = callback || function() {};
        this.getProperty(property, function(response) {
            if(response.success) {
                var parsedProperty = null;
                try {
                    parsedProperty = JSON.parse(response.contents);
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
                if(!parsedProperty) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.response.fetch',
                            status: response.getStatusText()
                        }
                    });
                    return;
                }
                callback({ success: true, data: parsedProperty });
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.property.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }
    setProperty(key, value, callback, abortBehavior, contentType) {
        callback = callback || function() {};
        contentType = contentType || utility.textRequestType;
        var params = {};
        if(abortBehavior && _.isString(abortBehavior) && !_.isEmpty(abortBehavior)) {
            params.abort = abortBehavior;
        }
        User.getUserPlug().at(this._id, 'properties', key).withParams(params).put(value, contentType, function(response) {
            if(response.isSuccess()) {
                var data = null;
                try {
                    data = response.getJson();
                } catch(e) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.property.set.parse',
                            status: response.getStatusText()
                        }
                    });
                }
                if(!data) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.property.set.fetch',
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
                        type: 'error.property.set',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }
    logUserSearch(data) {
        var def = new $.Deferred();
        var eventPlug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'events', 'search', 'current');
        eventPlug.post(JSON.stringify(data), utility.jsonRequestType, function(response) {
            if(response.isSuccess()) {
                def.resolve();
            } else {
                def.reject({ error: { type: 'error.activity.set', status: response.getStatusText() }});
            }
        });
        return def.promise();
    }
}
