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
if(!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';

        if(typeof start !== 'number') {
            start = 0;
        }
        if(start + search.length > this.length) {
            return false;
        }
        return this.indexOf(search, start) !== -1;
    };
}
export let utility = {
    xmlRequestType: 'application/xml; charset=utf-8',
    textRequestType: 'text/plain; charset=utf-8',
    jsonRequestType: 'application/json; charset=utf-8',
    searchEscape(query) {
        let result = query.toString();
        let charArr = [ '\\', '+', '-', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':' ];
        charArr.forEach((c) => {
            let regex = new RegExp('\\' + c, 'g');
            result = result.replace(regex, '\\' + c);
        });
        return result;
    },
    getResourceId(id, defaultId = null) {
        let resourceId = null;
        if(typeof id === 'string' && id !== defaultId) {
            resourceId = `=${encodeURIComponent(encodeURIComponent(id))}`;
        } else {
            resourceId = id;
        }
        return resourceId;
    },
    getUserToken(id) {
        let resourceId = null;
        if(typeof id === 'string') {
            if(id.includes(':')) {
                resourceId = id;
            } else {
                resourceId = `=${encodeURIComponent(encodeURIComponent(id))}`;
            }
        } else if(typeof id === 'number') {
            resourceId = id;
        } else {
            throw new Error('The user token must be a string or number');
        }
        return resourceId;
    },
    getFilenameId(filename) {
        if(typeof filename !== 'string') {
            throw new Error('The filename must be a string');
        }
        let encodedName = encodeURIComponent(encodeURIComponent(filename));
        if(filename.includes('.')) {

            // File name has no dot (or the dot is at the first position).
            // Assume that means it doesn't have an extension.
            encodedName = `=${encodedName}`;
        }
        return encodedName;
    }
};
