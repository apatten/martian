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
export let pageContentsModel = [
    { field: '@type', name: 'type' },
    { field: '@title', name: 'title' },
    { field: '@unsafe', name: 'unsafe', transform: 'boolean' },
    { field: '@draft', name: 'draft', transform: 'boolean' },
    { field: 'head' },
    { field: 'tail' },
    {
        field: 'body',
        transform(body) {
            return Array.isArray(body) ? body[0] : body;
        }
    },
    {
        field: 'body',
        name: 'targets',
        transform(body) {
            const targets = [];
            if(Array.isArray(body)) {
                for(let i = 1; i < body.length; i++) {
                    targets.push({ [body[i]['@target']]: body[i]['#text'] });
                }
            }
            return targets;
        }
    }
];
