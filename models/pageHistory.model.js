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
import { eventModel } from './event.model.js';
import { userModel } from './user.model.js';

export const pageHistoryModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@upto', name: 'upTo' },
    { field: '@since', name: 'since' },
    {
        field: 'summary',
        isArray: true,
        transform: [
            { field: '@id', name: 'id' },
            { field: '@datetime', name: 'datetime', transform: 'date' },
            { field: '@count', name: 'count', transform: 'number' },
            { field: '@detailid', name: 'detailId' },
            { field: '@journaled', name: 'journaled', transform: 'boolean' },
            { field: '@diffable', name: 'diffable', transform: 'boolean' },
            { field: '@uri.detail', name: 'detailUri' },
            { field: '@uri.hierarchy', name: 'hierarchyUri' },
            { field: 'event', transform: eventModel },
            {
                field: 'page',
                transform: [
                    { field: '@id', name: 'id', transform: 'number' },
                    { field: 'path' }
                ]
            },
            { field: [ 'users', 'user' ], name: 'users', isArray: true, transform: userModel }
        ]
    }
];
