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
import { userModel } from './user.model';
import { pageModel } from './page.model';
export const fileModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@revision', name: 'revision', transform: 'number' },
    { field: '@res-id', name: 'resId', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: '@res-is-head', name: 'resIsHead', transform: 'boolean' },
    { field: '@res-is-deleted', name: 'resIsDeleted', transform: 'boolean' },
    { field: '@res-rev-is-head', name: 'resRevIsHead', transform: 'boolean' },
    { field: '@res-contents-id', name: 'resContentsId', transform: 'number' },
    { field: 'date.created', name: 'dateCreated', transform: 'date' },
    { field: 'description' },
    { field: 'filename' },
    {
        field: 'contents',
        transform: [
            { field: '@type', name: 'type' },
            { field: '@size', name: 'size', transform: 'number' },
            { field: '@href', name: 'href' },
            { field: '@height', name: 'height', transform: 'number' },
            { field: '@width', name: 'width', transform: 'number' }
        ]
    },
    { field: 'user.createdby', name: 'userCreatedBy', transform: userModel },
    { field: 'page.parent', name: 'pageParent', transform: pageModel }
];
