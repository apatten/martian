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
import { userModel } from './user.model.js';

export const pageSecurityModel = [
    { field: '@href', name: 'href' },
    {
        field: [ 'grants', 'grant' ],
        name: 'grants',
        isArray: true,
        transform: [
            { field: 'date.modified', name: 'dateModified', transform: 'date' },
            { field: 'permissions', transform: permissionsModel },
            { field: 'user', transform: userModel },
            { field: 'user.modifiedBy', name: 'userModifiedBy', transform: userModel }
        ]
    },
    { field: 'permissions.effective', name: 'effectivePermissions', transform: permissionsModel },
    { field: 'permissions.page', name: 'pagePermissions', transform: permissionsModel },
    { field: 'permissions.revoked', name: 'revokedPermissions', transform: permissionsModel }
];
