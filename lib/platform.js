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
/* eslint-disable no-undef */
const _platformId = typeof window === 'undefined' ? 'node' : 'browser';
export const platform = {
    base64: {
        encode(rawString) {
            if(_platformId === 'node') {

                // In node, use `Buffer` to encode.
                return (new Buffer(rawString)).toString('base64');
            }

            // In the browser, use btoa() to encode.
            return window.btoa(rawString);
        },
        decode(b64String) {
            if(_platformId === 'node') {

                // In node, use `Buffer` to decode.
                return (new Buffer(b64String, 'base64')).toString('utf8');
            }

            // In the browser, use atob() to decode.
            return window.atob(b64String);
        }
    },
    fileReader: {
        toBuffer(fileObj) {
            if(_platformId === 'browser') {
                const fileReader = new FileReader();
                return fileReader.readAsArrayBuffer(fileObj);
            }
        },
        getContentType(fileObj) {
            if(_platformId === 'browser') {
                return fileObj.type;
            }
        }
    }
};

/* eslint-enable no-undef */
