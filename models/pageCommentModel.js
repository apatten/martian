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
import { pageModel } from './page.model.js';
import { userModel } from './user.model.js';

export const pageCommentModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@href', name: 'href' },
    {
        field: 'content',
        transform: [
            { field: '@type', name: 'type' },
            { field: '@href', name: 'href' },
            { field: '#text', name: 'text' }
        ]
    },
    { field: 'date.posted', name: 'postedDate', transform: 'date' },
    { field: 'date.edited', name: 'editedDate', transform: 'date' },
    { field: 'date.deleted', name: 'deletedDate', transform: 'date' },
    { field: 'number', transform: 'number' },
    { field: 'page.parent', name: 'pageParent', transform: pageModel },
    { field: 'title' },
    { field: 'uri.ui', name: 'uri' },
    { field: 'user.createdby', name: 'userCreatedBy', transform: userModel },
    { field: 'user.deletedby', name: 'userDeletedBy', transform: userModel },
    { field: 'user.editedby', name: 'userEditedBy', transform: userModel }
];
