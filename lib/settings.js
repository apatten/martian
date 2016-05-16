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
let _defaultHost = '/';
let _defaultQueryParams = { 'dream.out.format': 'json' };
let _defaultToken = null;
export class Settings {
    static get default() {
        return {
            get token() {
                return _defaultToken;
            },
            set token(token) {
                _defaultToken = token;
            },
            get host() {
                return _defaultHost;
            },
            set host(host) {
                _defaultHost = host;
            },
            reset() {
                _defaultHost = '/';
                _defaultQueryParams = { 'dream.out.format': 'json' };
                _defaultToken = null;
            }
        };
    }
    constructor({ host = _defaultHost, queryParams = _defaultQueryParams, token = _defaultToken } = {}) {
        this._host = host;
        this._token = token;
        this._queryParams = queryParams;
    }
    get host() {
        return this._host;
    }
    get token() {
        return this._token;
    }
    get plugConfig() {
        return {
            uriParts: { query: this._queryParams },
            beforeRequest: (params) => this._beforeRequest(params)
        };
    }
    _beforeRequest(params) {
        if(this._token !== null) {
            let token = this._token;
            if(typeof token === 'function') {
                token = this._token();
            }
            params.headers['X-Deki-Token'] = token;
        }
        return params;
    }
}
