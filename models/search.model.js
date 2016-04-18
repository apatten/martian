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
export let searchModel = [
    {
        field: '@ranking',
        name: 'ranking'
    },
    {
        field: '@queryid',
        name: 'queryId'
    },
    {
        field: '@querycount',
        name: 'queryCount',
        transform: 'integer'
    },
    {
        field: '@count.recommendations',
        name: 'recommendationCount',
        transform: 'integer'
    },
    {
        field: '@count',
        name: 'count',
        transform: 'integer'
    },
    {
        field: 'result',
        name: 'results',
        isArray: true,
        transform: [
            {
                field: 'author'
            },
            {
                field: 'content'
            },
            {
                field: 'date.modified',
                name: 'dateModified',
                transform: 'date'
            },
            {
                field: 'id',
                transform: 'integer'
            },
            {
                field: 'mime'
            },
            {
                field: 'rank',
                transform: 'integer'
            },
            {
                field: 'title'
            },
            {
                field: 'type'
            },
            {
                field: 'uri'
            },
            {
                field: 'uri.track',
                name: 'uriTrack'
            },
            {
                field: 'page',
                transform: pageModel
            }
        ]
    },
    {
        field: 'summary',
        transform: [
            {
                field: '@path',
                name: 'path'
            },
            {
                field: 'results',
                isArray: true,
                transform: [
                    {
                        field: '@path',
                        name: 'path'
                    },
                    {
                        field: '@count',
                        name: 'count',
                        transform: 'integer'
                    },
                    {
                        field: '@title',
                        name: 'title'
                    }
                ]
            }
        ]
    }
];
