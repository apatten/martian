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
export default class Site {
    constructor() {
        this._feedbackTemplate = _(
            '<?xml version="1.0"?>' +
            '<feedback>' +
            '<body><%- data.comment %></body>' +
            '<% if (data.title) { %><title><%= data.title %></title><% } %>' +
            '<metadata>' +
            '<% _(data.metadata).each(function(value, key) { %>' +
            '<<%= key %>><%= value %></<%= key %>>' +
            '<% }); %>' +
            '</metadata>' +
            '</feedback>'
        ).template(null, { variable: 'data' });
    }
    static _getSitePlug() {
        if(!this._sitePlug) {
            this._sitePlug = new Plug(settings.get('baseHref') + '/')
                .at('@api', 'deki', 'site')
                .withParams({ 'dream.out.format': 'json' });
        }
        return this._sitePlug;
    }
    static getRoles() {
        var requestDef = $.Deferred();
        Site._getSitePlug().at('roles').get(function(response) {
            if(response.isSuccess()) {
                var data = JSON.parse(response.responseText);
                requestDef.resolve({ data: data });
            } else {
                requestDef.reject({
                    error: {
                        type: 'error.roles.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
        return requestDef.promise();
    }
    static getTag(tags, classifications, params) {
        var tagDef = new $.Deferred();
        var plug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'pages', 'find');
        if(_(tags).isEmpty() && _(classifications).isEmpty()) {
            return tagDef.reject({
                error: {
                    type: 'error.tags.empty'
                }
            }).promise();
        }
        params = params || { };
        if(!_(tags).isArray()) {
            tags = [ tags ];
        }
        params.tags = tags.join(',');
        params.missingclassifications = classifications.join(',');
        plug.withParams(params)
            .withParam('dream.out.format', 'json')
            .get(function(response) {
                var data = JSON.parse(response.responseText);
                if(response.isSuccess()) {
                    tagDef.resolve({ data: data });
                } else {
                    tagDef.reject({
                        error: {
                            exception: data.exception,
                            classification: data.data.missing['classification-prefix'],
                            type: 'error.tags.fetch',
                            status: response.getStatusText()
                        }
                    });
                }
            });
        return tagDef.promise();
    }
    static getResourceString(options) {
        var def = new $.Deferred();
        if(!options.key) {
            $.error('The resource key is missing.');
        } else {
            var resPlug = Site._getSitePlug().at('localization', options.key);
            if(options.lang) {
                resPlug = resPlug.withParam('lang', options.lang);
            }
            resPlug.get(function(response) {
                if(response.isSuccess()) {
                    def.resolve(response.responseText);
                } else {
                    def.reject(response.getError());
                }
            });
        }
        return def.promise();
    }
    sendFeedback(requestData, callback) {
        callback = callback || function() {};
        var feedbackRequest = this._feedbackTemplate(requestData);
        Site._getSitePlug().at('feedback').post(feedbackRequest, utility.xmlRequestType, function(response) {
            if(response.isSuccess()) {
                callback({ success: true });
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.feedback.send',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }
    getTags(params, callback) {
        callback = callback || function() {};
        Site._getSitePlug().at('tags').withParams(params).get(function(response) {
            if(response.isSuccess()) {
                var data = JSON.parse(response.responseText);
                callback({ success: true, data: data });
            } else {
                callback({
                    success: false,
                    error: {
                        type: 'error.tags.fetch',
                        status: response.getStatusText()
                    }
                });
            }
        });
    }
}
