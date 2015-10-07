/*
 * MindTouch API - javascript api for mindtouch
 * Copyright (c) 2012 MindTouch Inc.
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
var utility = {
    getStringParams: function(queryString) {
        var retVal = {};
        var params = words(strRight(queryString, '?'), '&');
        params.forEach(function(pair) {
            var myPair = pair.split('=');
            if(myPair[0]) {
                retVal[decodeURIComponent(myPair[0])] = decodeURIComponent(myPair[1]);
            }
        });
        return retVal;
    },
    buildQueryString: function(paramObject) {
        return _(paramObject).reduce(function(acc, num, key) {
            var nextQueryStr = acc.querystring + acc.delim + encodeURIComponent(key) + '=';
            if(num) {
                nextQueryStr += encodeURIComponent(num);
            }
            return {
                querystring: nextQueryStr,
                delim: '&'
            };
        }, { querystring: '', delim: '' }).querystring;
    },
    leftTrim: function(str, char) {
        if(!char) {
            char = '\s';
        }
        return str.replace(new RegExp('^' + char + '+'), '');
    }
};
export default utility;
