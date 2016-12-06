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
import { fileModel } from './file.model.js';
import { groupModel } from './group.model.js';

function dateOrStringTransformer(value) {
    const date = new Date(value);
    const dateValue = date.getDate();

    // eslint-disable-next-line no-self-compare
    if(dateValue !== dateValue) {
        return value;
    }
    return date;
}

export const eventModel = [
    { field: '@cascading', name: 'cascading', transform: 'boolean' },
    { field: '@datetime', name: 'datetime', transform: 'date' },
    { field: '@id', name: 'id' },
    { field: '@journaled', name: 'journaled', transform: 'boolean' },
    { field: '@language', name: 'language' },
    { field: 'change-comment', name: 'changeComment' },
    { field: 'previous.restriction-id', name: 'previousRestrictionId', transform: 'number' },
    { field: 'restriction-id', name: 'restrictionId', transform: 'number' },
    { field: 'legacy-commit', name: 'legacyComment' },
    { field: 'root.page', name: 'rootPage', transform: pageModel },
    { field: '@type', name: 'type' },
    { field: '@version', name: 'version', transform: 'number' },
    { field: 'to', transform: dateOrStringTransformer },
    { field: 'from', transform: dateOrStringTransformer },
    { field: 'afternode.page', name: 'afternodePage', transform: pageModel },
    { field: 'displayname.current', name: 'currentDisplayName' },
    { field: 'displayname.previous', name: 'previousDisplayName' },
    { field: 'create-reason', name: 'createReason' },
    { field: 'source.page', name: 'sourcePage', transform: pageModel },
    { field: 'page', transform: pageModel },
    { field: 'user', transform: userModel },
    { field: 'file', transform: fileModel },
    { field: 'source.file', name: 'sourceFile', transform: fileModel },
    {
        field: 'data',
        transform: [
            { field: 'constraint' },
            { field: 'path' },
            { field: 'query' },
            { field: 'limit', transform: 'number' },
            { field: 'qid', transform: 'number' },
            { field: 'totalrecommended', name: 'totalRecommended', transform: 'number' },
            { field: 'totalresults', name: 'totalResults', transform: 'number' },
            { field: '_uri.host', name: 'host' },
            { field: '_uri.query', name: 'uriQuery' },
            { field: '_uri.scheme', name: 'scheme' }
        ]
    },
    {
        field: 'diff',
        transform: [
            { field: '@toolarge', name: 'tooLarge', transform: 'boolean' },
            { field: 'added', transform: 'number' },
            { field: 'attributes', transform: 'number' },
            { field: 'removed', transform: 'number' },
            { field: 'structural', transform: 'number' }
        ]
    },
    {
        field: 'grant',
        transform: [
            { field: 'group', transform: groupModel },
            { field: 'id', transform: 'number' },
            {
                field: 'role',
                transform: [
                    { field: '@id', name: 'id', transform: 'number' }
                ]
            },
            { field: 'type' },
            { field: 'user', transform: userModel }
        ]
    },
    {
        field: 'property',
        transform: [
            { field: 'name' }
        ]
    },
    {
        field: 'request',
        transform: [
            { field: '@count', name: 'count', transform: 'number' },
            { field: '@id', name: 'id' },
            { field: '@seq', name: 'seq', transform: 'number' },
            { field: 'ip' },
            { field: 'session-id', name: 'sessionId' },
            { field: 'signature' },
            { field: 'user', transform: userModel }
        ]
    },
    {
        field: [ 'tags-added', 'tag' ],
        name: 'tagsAdded',
        isArray: true,
        transform: [
            { field: 'name' }
        ]
    },
    {
        field: [ 'tags-removed', 'tag' ],
        name: 'tagsRemoved',
        isArray: true,
        transform: [
            { field: 'name' }
        ]
    }
];
