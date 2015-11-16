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
import Plug from 'community/deki.plug';
import utility from 'community/deki.utility';
import settings from 'community/settings';
export default class Draft {

    /**
     * @param {int} id
     * @constructor
     */
    constructor(id) {
        this._id = (_(id).isNumber()) ? id : parseInt(id, 10);
        this._plug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'drafts').withParam('dream.out.format', 'json');
        this._historyPlug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'events', 'draft').withParam('dream.out.format', 'json');
    }

    // TODO: (davidc 5/18/2015) move this function somewhere else, it doesn't make much sense being attached
    // to this object.
    getDrafts(params) {
        var self = this;
        var def = new $.Deferred();
        params = params || {};
        self._plug.withParams(params).get(function(response) {
            if(response.isSuccess()) {
                var json = response.getJson();
                def.resolve({ data: json });
            } else {
                def.reject(response.getError());
            }
        });
        return def.promise();
    }
    revertTo(params) {
        var def = new $.Deferred();
        this.getPlug().withParams(params).at('revert').post(null, utility.textRequestType, function(response) {
            if(response.isSuccess()) {
                def.resolve();
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
    setDisplayTitle(title) {
        var def = new $.Deferred();
        this.getPlug().at('title').put(title, utility.textRequestType, function(response) {
            if(response.isSuccess()) {
                var data = response.responseText;
                def.resolve(data);
            } else {
                def.reject(response);
            }
        });
        return def.promise();
    }
    deactivate() {
        var def = new $.Deferred();
        this.getPlug().at('deactivate').post('', utility.textRequestType, function(response) {
            if(response.isSuccess()) {
                def.resolve();
            } else {
                def.reject(response);
            }
        });
        return def.promise();
    }
    publish() {
        var def = new $.Deferred();
        this.getPlug().at('publish').post('', utility.textRequestType, function(response) {
            if(response.isSuccess()) {
                def.resolve();
            } else {
                def.reject(response);
            }
        });
        return def.promise();
    }
    unpublish() {
        var def = new $.Deferred();
        this.getPlug().at('unpublish').post('', utility.textRequestType, function(response) {
            if(response.isSuccess()) {
                def.resolve();
            } else {
                def.reject(response);
            }
        });
        return def.promise();
    }
    getPlug() {
        return this._plug.at(this._id);
    }
    getHistoryPlug() {
        return this._historyPlug.at(this._id);
    }
}
