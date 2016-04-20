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
export let pageRatingModel = [
    {
        field: '@count',
        name: 'count',
        transform: 'number'
    },
    {
        field: '@date',
        name: 'date',
        transform: 'date'
    },
    {
        field: '@seated.count',
        name: 'seatedCount',
        transform: 'number'
    },
    {
        field: '@unseated.count',
        name: 'unseatedCount',
        transform: 'number'
    },
    {
        field: '@score',
        name: 'score',
        transform: 'number'
    },
    {
        field: '@seated.score',
        name: 'seatedScore',
        transform: 'number'
    },
    {
        field: '@unseated.score',
        name: 'unseatedScore',
        transform: 'number'
    },
    {
        field: '@score.trend',
        name: 'scoreTrend',
        transform: 'number'
    },
    {
        field: '@seated.score.trend',
        name: 'seatedScoreTrend',
        transform: 'number'
    },
    {
        field: '@unseated.score.trend',
        name: 'unseatedScoreTrend',
        transform: 'number'
    },
    {
        field: 'user.ratedby',
        name: 'userRatedBy',
        transform: [
            {
                field: '@id',
                name: 'id',
                transform: 'number'
            },
            {
                field: '@score',
                name: 'score',
                transform: 'number'
            },
            {
                field: '@date',
                name: 'date',
                transform: 'date'
            },
            {
                field: '@href',
                name: 'href'
            },
            {
                field: '@seated',
                name: 'seated',
                transform: 'boolean'
            }
        ]
    }
];
