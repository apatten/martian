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
import { pageModel } from './page.model';
export let eventModel = [
    {
        field: '@id',
        name: 'id'
    },
    {
        field: '@datetime',
        name: 'datetime',
        transform: 'date'
    },
    {
        field: '@type',
        name: 'type'
    },
    {
        field: '@journaled',
        name: 'journaled',
        transform: 'boolean'
    },
    {
        field: '@version',
        name: 'version',
        transform: 'number'
    },
    {
        field: [ 'request', '@id' ],
        name: 'requestId'
    },
    {
        field: '@language',
        name: 'language'
    },
    {
        field: 'page',
        transform: pageModel
    },
    {
        field: 'user',
        transform: [
            {
                field: '@id',
                name: 'id',
                transform: 'number'
            },
            {
                field: 'name'
            }
        ]
    },
    {
        field: 'file',
        transform: [
            {
                field: '@id',
                name: 'id',
                transform: 'number'
            },
            {
                field: '@revision',
                name: 'revision',
                transform: 'number'
            },
            {
                field: '@res-id',
                name: 'resId',
                transform: 'number'
            },
            {
                field: 'description'
            },
            {
                field: 'filename'
            },
            {
                field: 'location'
            }
        ]
    },
    {
        field: 'data',
        transform: [
            {
                field: 'constraint'
            },
            {
                field: 'path'
            },
            {
                field: 'query'
            },
            {
                field: 'limit',
                transform: 'number'
            },
            {
                field: 'qid',
                transform: 'number'
            },
            {
                field: 'totalrecommended',
                name: 'totalRecommended',
                transform: 'number'
            },
            {
                field: 'totalresults',
                name: 'totalResults',
                transform: 'number'
            },
            {
                field: '_uri.host',
                name: 'host'
            },
            {
                field: '_uri.query',
                name: 'uriQuery'
            },
            {
                field: '_uri.scheme',
                name: 'scheme'
            }
        ]
    }
];
