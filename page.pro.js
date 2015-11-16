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
import Page from 'community/page';
import Uri from 'community/deki.uri';
import settings from 'community/settings';
import Draft from './draft';
import utility from 'community/deki.utility';
import {fileUploadFactory} from './fileUploader';
export default class PagePro extends Page {
    constructor(id, mode = 'auto') {
        super(id);
        this._draft = new Draft(this._id);
        this.mode = mode;

        // XML that sets the restriction for a page.  Constructed as an underscore template.
        this._restrictionRequestTmpl = _(
            '<security>' +
                '<permissions.page>' +
                    '<restriction><%= data.restriction %></restriction>' +
                '</permissions.page>' +
                '<grants>' +
                    '<grant>' +
                        '<permissions>' +
                            '<role><%= data.role %></role>' +
                        '</permissions>' +
                        '<user id="<%= data.userId %>"></user>' +
                    '</grant>' +
                '</grants>' +
            '</security>'
        ).template(null, { variable: 'data' });

        // XML that sets tags for a page.  Constructed as an underscore template.
        this._tagsRequestTmpl = _(
            '<tags>' +
                '<% _.each(data.tags, function(tag) { %>' +
                    '<tag value="<%- tag %>" />' +
                '<% }); %>' +
            '</tags>'
        ).template(null, { variable: 'data' });
    }
    getPlug() {
        let draft = settings.get('isDraftRequest');
        if(this.mode === 'live') {
            draft = false;
        } else if(this.mode === 'draft') {
            draft = true;
        }
        return draft ? this._draft.getPlug() : this._pagePlug.at(this._id);
    }
    getHistoryPlug() {
        var uri = new Uri(document.location.href);
        return (uri.getQueryParamValue('draft') === 'true') ? this._draft.getHistoryPlug() : this._historyPlug.at(this._id);
    }
    getDraft() {
        return this._draft;
    }

    /**
     * Prepare a page creation operation and then create a saved page.  If the templateSource member is set, the template contents will be fetched first.
     */
    create(options, callback) {
        _(this).extend(options);
        callback = callback || function() {};
        if(this.templateSource) {
            var self = this;
            this._pagePlug.at('=' + encodeURIComponent(this.templateSource), 'contents')
                .withParams(_(this.templateContentArgs).extend({
                    'dream.out.format': 'xml'
                }))
                .get(function(response) {
                    if(response.isSuccess()) {
                        self.contents = response.responseText;
                        self._createPage(callback);
                    } else {
                        callback({
                            success: false,
                            error: {
                                type: 'error.template.fetch',
                                status: response.getStatusText()
                            }
                        });
                    }
                });
        } else {
            this._createPage(callback);
        }
    }

    /**
     * Create a saved page using the contents member or blank.
     * @param {function} callback A callback function that will be called when the process is complete or an error has occurred.
     */
    _createPage(callback) {
        var content = '';
        if(this.contents) {
            var $wrapper = $('<div></div>').append($(this.contents).text());
            content = $wrapper.html();
        } else if(this.rawContents) {
            content = this.rawContents;
        }
        var encodedName = encodeURIComponent(this.title);
        var self = this;
        this._pagePlug.at('=' + encodedName, 'contents')
            .withParams({ abort: 'exists' }).withParams(this.params)
            .post(content, 'text/plain; charset=utf-8', function(result) {
                if(result.isSuccess()) {
                    var data = null;
                    try {
                        data = JSON.parse(result.responseText);
                    } catch(e) {
                        callback({
                            success: false,
                            error: {
                                type: 'error.response.parse',
                                status: result.getStatusText()
                            }
                        });
                        return;
                    }
                    if(data) {
                        self._id = parseInt(data.page['@id'], 10);
                        callback({
                            success: true,
                            id: data.page['@id'],
                            path: data.page.path,
                            title: data.page.title
                        });
                    } else {
                        callback({
                            success: false,
                            error: {
                                type: 'error.invalid.response',
                                status: result.getStatusText()
                            }
                        });
                    }
                } else if(result.status === 409) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.duplicate.name',
                            status: result.getStatusText()
                        }
                    });
                } else {
                    callback({
                        success: false,
                        error: {
                            type: 'error.page.create',
                            status: result.getStatusText()
                        }
                    });
                }
            });
    }

    /**
     * Move a page to a new location.
     * @param {object.<string, number|string>} params An object containing the parameters that are passed as query string options to the API.
     *               Valid parameters are as follows:
     *                 title (string) Set the title of the page. The name of a page is also modified unless it's provided
     *                 parentid (int) Relocate the page under a given parent page
     *                 name (string) Move the page to the given name while keeping it under the same parent page
     *                 to (string) new page location including the path and name of the page
     * @param {function} callback An optional callback that is called when the operation is complete or an error has occurred.
     */
    move(params, callback) {
        var def = new $.Deferred();
        callback = callback || utility.finishDeferred(def);
        this._pagePlug.at(this._id, 'move').withParams(params).post(null, 'text/plain; charset=utf-8', function(result) {
            var data = null;
            if(result.isSuccess()) {
                try {
                    data = JSON.parse(result.responseText);
                } catch(e) {
                    callback({
                        success: false,
                        error: {
                            type: 'error.response.parse',
                            status: result.getStatusText()
                        }
                    });
                    return;
                }

                if(data) {
                    callback({ success: true, data: data });
                } else {
                    callback({
                        success: false,
                        error: {
                            type: 'error.response.parse',
                            status: result.getStatusText()
                        }
                    });
                }
            } else {
                var error = result.getError();
                error.status = result.getStatusText();
                error.type = 'error.page.move';
                callback({
                    success: false,
                    error: error
                });
            }
        });
        return def.promise();
    }

    /**
     * Copy a page to a location.
     * @param {object.<string, number|string>} params An object containing the parameters that are passed as query string options to the API.
     *               Valid parameters are as follows:
     *                 title (string) Set the title of the page. The name of a page is also modified unless it's provided
     *                 recursive = bool? : Copy child pages? (default: false)
     *                 children = bool? : Copy child pages? (deprecated, use 'recursive' instead) (default: false)
     *                 to (string) new page location including the path and name of the page
     *                 attachments = bool? : Copy attachments? (default: true)
     *                 tags = bool? : Copy tags? (default: true)
     *                 authenticate = bool? : Force authentication for request (default: false)
     *{function} callback An optional callback that is called when the operation is complete or an error has occurred.
     */
    copy(params) {
        var def = new $.Deferred();
        this._pagePlug.at(this._id, 'copy').withParams(params).post(null, 'text/plain; charset=utf-8', function(response) {
            if(response.isSuccess()) {
                var outerResponse = JSON.parse(response.responseText);
                def.resolve(outerResponse);
            } else {
                def.reject({ error: response });
            }
        });
        return def.promise();
    }

    /**
     * Set the tags for the page identified by the _id member.
     * @param {Array.<string>} tags An array of strings that will be used as the new set of tags on the page.
     * @param {function} callback A callback function that will be called when the process is complete or an error has occurred.
     */
    setTags(tags, callback) {
        callback = callback || function() {};
        if(_.isArray(tags)) {
            var tagsReq = this._tagsRequestTmpl({ tags: tags });
            this.getPlug().at('tags')
                .withParams({ 'dream.in.format': 'xml' })
                .put(tagsReq, utility.xmlRequestType, function(resp) {
                    if(resp.isSuccess()) {
                        var respData = JSON.parse(resp.responseText);
                        callback({ success: true, tags: respData });
                    } else {
                        callback({
                            success: false,
                            error: {
                                type: 'error.set.tags',
                                status: resp.getStatusText()
                            }
                        });
                    }
                });
        } else {
            callback({
                success: false,
                error: { type: 'error.invalid.tags' }
            });
        }
    }

    /**
     * Set restrictions (security) for the page identified by the _id member.
     * @param {Object.<string, number|string|boolean>} restrictionOpts An object containing the parameters required for the security request.
     * @param {function} callback A callback function that will be called when the process is complete or an error has occurred.
     */
    setRestriction(restrictionOpts, callback) {
        callback = callback || function() {};
        if(!restrictionOpts || !restrictionOpts.restriction || !restrictionOpts.userId || !restrictionOpts.role) {
            callback({
                success: false,
                error: { type: 'error.restriction.config' }
            });
        } else {
            var restrictionRequest = this._restrictionRequestTmpl(restrictionOpts);
            var params = { 'dream.in.format': 'xml' };
            if(restrictionOpts.cascade) {
                params.cascade = restrictionOpts.cascade;
            }
            this._pagePlug.at(this._id, 'security')
                .withParams(params)
                .put(restrictionRequest, utility.xmlRequestType, function(resp) {
                    if(resp.isSuccess()) {
                        var parsedResponse = null;
                        try {
                            parsedResponse = JSON.parse(resp.responseText);
                        } catch(e) {
                            callback({
                                success: false,
                                error: {
                                    type: 'error.response.parse',
                                    status: resp.getStatusText()
                                }
                            });
                            return;
                        }
                        callback({ success: true, data: parsedResponse });
                    } else {
                        callback({
                            success: false,
                            error: {
                                type: 'error.restriction.setting',
                                status: resp.getStatusText()
                            }
                        });
                    }
                });
        }
    }
    revertTo(params) {
        var def = new $.Deferred();
        this._pagePlug.withParams(params).at(this._id, 'revert').post(null, utility.textRequestType, function(response) {
            if(response.isSuccess()) {
                try {
                    def.resolve();
                } catch(e) {
                    def.reject({ error: { type: 'error.json.parse' }});
                }
            } else {
                def.reject({
                    error: {
                        type: 'error.page.revert',
                        status: response.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
    getExportUriInfo(callback) {
        this._pagePlug.at(this._id, 'export').post('', utility.jsonRequestType, function(response) {
            var resp = null;
            try {
                resp = response.getJson();
            } catch(e) {
                callback({ success: false });
                return;
            }
            callback({ success: true, uri: resp['uri.download'] });
        });
    }
    _getImportParams(filename, isLegacy) {
        if(isLegacy) {
            return {
                uri: '/deki/gui/plugin.php',
                formatter: 'file_upload_proxy',
                action: 'import',
                pageId: this._id,
                format: 'html'
            };
        }
        return {
            uri: this._pagePlug.at(this._id, 'import').withParams({
                filename: encodeURIComponent(filename),
                behavior: 'async'
            }).getUrl(),
            method: 'PUT'
        };
    }
    importArchive(params) {
        var def = new $.Deferred(),
            self = this;
        fileUploadFactory.create({ fileInput: params.fileInput }).done(function(uploader, isLegacy) {
            if(_(uploader).isArray()) {
                uploader = uploader[0];
            }
            uploader.params = self._getImportParams(uploader.getFileName(), isLegacy);
            uploader.uploadFile({
                maxFileSize: params.maxFileSize,
                allowedExtensions: params.allowedExtensions
            }).done(function(data) {
                def.resolve(data);
            }).fail(function(error) {
                def.reject(error);
            }).progress(function(data) {
                def.notify(data);
            });
        }).fail(function() {
            def.reject({
                error: 'file.upload.fileread'
            });
        });
        return def.promise();
    }
    deletePage(options) {
        var def = new $.Deferred();
        this._pagePlug.at(this._id).withParams(options).del(function(response) {
            if(response.isSuccess()) {
                def.resolve(response.getJson());
            } else {
                def.reject({
                    error: {
                        type: 'error.restriction.setting',
                        status: response.getStatusText()
                    }
                });
            }
        });
        return def.promise();
    }
    setOrder(params) {
        var def = new $.Deferred();
        this._pagePlug.at(this._id, 'order').withParams(params).put(
            '',
            utility.textRequestType,
            function(response) {
                if(response.isSuccess()) {
                    def.resolve();
                } else {
                    def.reject();
                }
            }
        );
        return def.promise();
    }
    getHeirarchy() {
        var def = new $.Deferred();
        this._pagePlug.at(this._id, 'files,subpages')
            .get(function(response) {
                if(response.isSuccess()) {
                    var outerResponse = JSON.parse(response.responseText);
                    def.resolve(outerResponse);
                } else {
                    def.reject({ error: { type: 'error.template.html.fetch', status: response.getStatusText() }});
                }
            });
        return def.promise();
    }
    getFileInfo() {
        var def = new $.Deferred();
        this._pagePlug.at(this._id, 'info')
        .get(function(response) {
            if(response.isSuccess()) {
                var outerResponse = JSON.parse(response.responseText);
                def.resolve(outerResponse);
            } else {
                def.reject({ error: { type: 'error.template.html.fetch', status: response.getStatusText() }});
            }
        });
        return def.promise();
    }
    getPageInfoWithHeirarchy() {
        var self = this;
        var def = new $.Deferred();
        $.when(self.getHeirarchy(), self.getFullInfo()).done(function(hierarchy, info) {
            var thisResponse = info.info;
            thisResponse.subpages = hierarchy;
            def.resolve(thisResponse);
        });
        return def.promise();
    }
    setOverview(options) {
        var def = new $.Deferred();
        if(!('body' in options)) {
            def.reject({
                error: 'error.overview.set.notext'
            });
        } else {
            var requestBodyTemplate = _(
                '<overview><%- data.overview %></overview>'
            ).template(null, { variable: 'data' });
            this.getPlug().at('overview').put(requestBodyTemplate({
                overview: options.body
            }), utility.xmlRequestType, function(resp) {
                if(resp.isSuccess()) {
                    def.resolve();
                } else {
                    def.reject({
                        error: { type: 'error.overview.set', status: resp.getStatusText() }
                    });
                }
            });
        }
        return def.promise();
    }
    setContents(options) {
        var def = new $.Deferred();
        var params = {
            abort: 'never',
            edittime: 'now'
        };
        this._pagePlug.at(this._id, 'contents').withParams(params).post(options.content, utility.textRequestType, function(result) {
            if(result.isSuccess()) {
                def.resolve();
            } else {
                def.reject();
            }
        });
        return def.promise();
    }
}
