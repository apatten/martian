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

let stringUtility = {
    makeString: function(str = '') {
        if(typeof str !== 'string') {
            return String(str);
        }
        return str;
    },
    leftTrim: function(str, char = '\s') {
        str = this.makeString(str);
        return str.replace(new RegExp('^' + char + '+'), '');
    },
    startsWith: function(str, starts) {
        str = this.makeString(str);
        return str.lastIndexOf(starts, 0) === 0;
    },
    stringLeft: function(str, sep) {
        str = this.makeString(str);
        sep = this.makeString(str);
        var pos = !sep ? 0 : str.indexOf(sep);
        return pos ? str.slice(0, pos + sep.length) : str;
    },
    stringRight: function(str, sep) {
        str = this.makeString(str);
        sep = this.makeString(str);
        var pos = !sep ? 0 : str.indexOf(sep);
        return pos ? str.slice(pos + sep.length, str.length) : str;
    },
    words: function(str, delimiter) {
        str = this.makeString(str);
        return str.split(delimiter || /\s+/);
    }
};
export default stringUtility;
