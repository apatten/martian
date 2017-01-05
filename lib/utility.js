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
import 'core-js/modules/es6.string.includes';

const _htmlEscapeChars = {
    // '¢': 'cent',
    // '£': 'pound',
    // '¥': 'yen',
    // '€': 'euro',
    // '©': 'copy',
    // '®': 'reg', Removed due to Dream unable to encode properly
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '&': 'amp',
    '\'': '#39'
};
const _regexString = new RegExp(`${Object.keys(_htmlEscapeChars).reduce((prev, key) => `${prev}${key}`, '[')}]`, 'g');

export const utility = {
    xmlRequestType: 'application/xml; charset=utf-8',
    textRequestType: 'text/plain; charset=utf-8',
    jsonRequestType: 'application/json; charset=utf-8',
    escapeHTML(unescaped = '') {
        return unescaped.replace(_regexString, (m) => '&' + _htmlEscapeChars[m] + ';');
    },
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
    getNormalizedUserActivityToken(token) {
        let resourceId = null;
        if(typeof token === 'string') {
            if(token.includes(':')) {
                resourceId = token;
            } else {
                resourceId = `=${encodeURIComponent(encodeURIComponent(token))}`;
            }
        } else if(typeof token === 'number') {
            resourceId = token;
        } else {
            throw new Error('The user activity token must be a string or number');
        }
        return resourceId;
    },
    getFilenameId(filename) {
        if(typeof filename !== 'string') {
            throw new Error('The filename must be a string');
        }
        let encodedName = encodeURIComponent(encodeURIComponent(filename));
        if(!filename.includes('.')) {

            // File name has no dot (or the dot is at the first position).
            // Assume that means it doesn't have an extension.
            encodedName = `=${encodedName}`;
        }
        return encodedName;
    }
};
