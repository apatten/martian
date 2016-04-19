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
export let permissionsModel = [
    {
        field: [ 'operations', '#text' ],
        transform(value) {
            let result = [];
            if(typeof value === 'string') {
                result = value.split(',');
            }
            return result;
        }
    },
    {
        field: 'role',
        transform(value) {
            let roleObj = {};
            if(typeof value === 'string') {
                roleObj.name = value;
            } else if(value && typeof value === 'object') {
                if('#text' in value) {
                    roleObj.name = value['#text'];
                }
                if('@id' in value) {
                    roleObj.id = parseInt(value['@id'], 10);
                }
                if('@href' in value) {
                    roleObj.href = value['@href'];
                }
            }
            return roleObj;
        }
    }
];
