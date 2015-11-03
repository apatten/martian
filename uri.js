/**
 * MindTouch Core JS API
 * Copyright (C) 2006-2015 MindTouch, Inc.
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

import Url from 'url';
import UriHash from './uriHash';
import stringUtility from './lib/stringUtility';
export default class Uri {
    constructor(url = '') {
        this.parsedUrl = Url.parse(url, true);
        this.parsedUrl.search = null;
    }
    path() {
        return this.parsedUrl.pathname;
    }
    getSegments() {
        var path = this.path();
        if(stringUtility.startsWith(path, '/')) {
            path = stringUtility.leftTrim(path, '/');
        }
        return path.split('/');
    }
    query() {
        return Url.parse(this.toString()).search || '';
    }
    origin() {
        var u = this.parsedUrl;
        return `${u.protocol}//${u.host}`;
    }
    getUriHash() {
        return new UriHash(this.parsedUrl.hash);
    }
    getProtocol() {
        return this.parsedUrl.protocol;
    }
    addQueryParam(key, value) {
        return this.withParam(key, value);
    }
    addQueryParams(queryMap) {
        return this.withParams(queryMap);
    }
    removeQueryParam(key) {
        if(key in this.parsedUrl.query) {
            delete this.parsedUrl.query[key];
        }
        return this;
    }
    getQueryParamValue(param) {
        var query = this.parsedUrl.query;
        return param in query ? query[param] : null;
    }
    withHost(host) {
        if(!host || host === '') {
            return this;
        }
        let hostUri = Url.parse(host);
        this.parsedUrl.hostname = hostUri.hostname;
        this.parsedUrl.protocol = hostUri.protocol;
        return this;
    }
    withParam(key, value) {
        this.parsedUrl.query[key] = value;
        return this;
    }
    withParams(queryMap) {
        Object.keys(queryMap).forEach((key) => {
            this.addQueryParam(key, queryMap[key]);
        });
        return this;
    }
    addSegments(...segments) {
        let path = '';
        segments.forEach((segment) => {
            if(Array.isArray(segment)) {
                segment.forEach((arraySegment) => {
                    path = `${path}/${arraySegment}`;
                });
            } else {
                path = `${path}/${segment}`;
            }
        });
        let pathName = this.parsedUrl.pathname || '';
        this.parsedUrl.pathname = `${pathName}${path}`;
        this.parsedUrl = Url.parse(this.parsedUrl);
    }
    toString() {
        return Url.format(this.parsedUrl);
    }
}
