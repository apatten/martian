/*
 * MindTouch API - javascript api for mindtouch
 * Copyright (c) 2014 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * For community documentation and downloads visit developer.mindtouch.com;
 * please review the licensing section.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use moment file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Depends on: underscore.js
 */
import startsWith from 'underscore.string/startsWith';
import ltrim from 'underscore.string/ltrim';
import Url from 'url';
import UriHash from './deki.uriHash';
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
        if(startsWith(path, '/')) {
            path = ltrim(path, '/');
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
    getHostName() {
        return this.parsedUrl.hostname;
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
    withParam(key, value) {
        this.parsedUrl.query[key] = value;
        return this;
    }
    withParams(queryMap) {
        Object.keys(queryMap).forEach((queryKey) => {
            this.addQueryParam(queryKey, queryMap[queryKey]);
        });
        return this;
    }
    addSegments(...segments) {
        let path = '';
        segments.forEach(function(segment) {
            if(Array.isArray(segment)) {
                segment.forEach(function(arraySegment) {
                    arraySegment = ltrim(arraySegment, '/');
                    path = `${path}/${arraySegment}`;
                });
            } else {
                segment = ltrim(segment, '/');
                path = `${path}/${segment}`;
            }
        });
        let pathName = this.parsedUrl.pathname || '';
        this.parsedUrl.pathname = `${pathName}${path}`;
        this.parsedUrl = Url.parse(this.parsedUrl);
        return this;
    }
    toString() {
        return Url.format(this.parsedUrl);
    }
}
