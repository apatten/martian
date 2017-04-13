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
import { permissionsModel } from './permissions.model.js';
import { groupModel } from './group.model.js';

export const userModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@anonymous', name: 'anonymous', transform: 'boolean' },
    { field: '@wikiid', name: 'wikiId' },
    { field: '@href', name: 'href' },
    { field: 'date.created', name: 'dateCreated', transform: 'date' },
    { field: 'date.lastlogin', name: 'lastLoginDate', transform: 'date' },
    { field: 'email' },
    { field: 'fullname' },
    { field: [ 'license.seat', '#text' ], name: 'seated', transform: 'boolean' },
    { field: [ 'license.seat', '@owner' ], name: 'siteOwner', transform: 'boolean' },
    { field: 'nick' },
    { field: [ 'password', '@exists' ], name: 'passwordExists', transform: 'boolean' },
    { field: 'status' },
    { field: 'username' },
    { field: 'permissions.user', name: 'userPermissions', transform: permissionsModel },
    { field: [ 'groups', 'group' ], name: 'groups', isArray: true, transform: groupModel }
];
