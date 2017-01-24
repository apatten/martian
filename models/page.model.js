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
import { pageRatingModel } from './pageRating.model.js';
import { userModel } from './user.model.js';
const pageModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: 'title' },
    { field: '@guid', name: 'guid' },
    { field: 'uri.ui', name: 'uri' },
    { field: '@href', name: 'href' },
    { field: '@state', name: 'state' },
    { field: '@draft.state', name: 'draftState' },
    { field: 'article' },
    { field: 'language' },
    { field: 'namespace' },
    { field: 'language.effective', name: 'languageEffective' },
    { field: 'timeuuid' },
    { field: [ 'path', '#text' ] },
    { field: 'restriction' },
    { field: '@revision', name: 'revision', transform: 'number' },
    { field: 'path.original', name: 'originalPath', transform: decodeURIComponent },
    { field: '@deleted', name: 'deleted', transform: 'boolean' },
    { field: '@publish', name: 'publish', transform: 'boolean' },
    { field: '@unpublish', name: 'unpublish', transform: 'boolean' },
    { field: '@deactivate', name: 'deactivate', transform: 'boolean' },
    { field: '@virtual', name: 'virtual', transform: 'boolean' },
    { field: '@subpages', name: 'hasSubpages', transform: 'boolean' },
    { field: '@terminal', name: 'terminal', transform: 'boolean' },
    { field: 'overview' },
    { field: 'user.author', name: 'userAuthor', transform: userModel },
    { field: 'date.created', name: 'dateCreated', transform: 'date' },
    { field: 'date.modified', name: 'dateModified', transform: 'date' },
    { field: 'date.edited', name: 'dateEdited', transform: 'date' },
    { field: [ 'revisions', '@count' ], name: 'revisionCount', transform: 'number' },
    { field: [ 'comments', '@count' ], name: 'commentCount', transform: 'number' },
    {
        field: 'rating',
        constructTransform(rating) {
            if(typeof rating === 'object' && rating !== null) {
                return pageRatingModel;
            }
        }
    },
    {
        field: 'metrics',
        transform: [
            { field: 'metric.charcount', name: 'charCount', transform: 'number' },
            { field: 'metric.views', name: 'views', transform: 'number' }
        ]
    },
    {
        field: [ 'tags', 'tag' ],
        isArray: true,
        transform: [
            { field: '@href', name: 'href' },
            { field: '@id', name: 'id', transform: 'number' },
            { field: '@value', name: 'value' },
            { field: 'title' },
            { field: 'type' },
            { field: 'uri' }
        ]
    }
];
pageModel.push({ field: 'page.parent', name: 'pageParent', transform: pageModel });
export { pageModel };
