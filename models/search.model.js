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
import { modelHelper } from './modelHelper';
let searchModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let search = {
            ranking: obj['@ranking'],
            queryId: obj['@queryid'],
            queryCount: modelHelper.getInt(obj['@querycount']),
            recommendationCount: modelHelper.getInt(obj['@count.recommendations']),
            count: modelHelper.getInt(obj['@count']),
            result: []
        };
        if('result' in obj) {
            let results = modelHelper.getArray(obj.result);
            results.forEach((result) => {
                search.result.push({
                    author: result.author,
                    content: result.content,
                    dateModified: modelHelper.getDate(result['date.modified']),
                    id: result.id,
                    mime: result.mime,
                    rank: result.rank,
                    title: result.title,
                    type: result.type,
                    uri: result.uri,
                    uriTrack: result['uri.track'],
                    page: {
                        path: result.page.path,
                        rating: result.page.rating,
                        title: result.page.title,
                        uriUi: result.page['uri.ui']
                    }
                });
            });
        }
        if('summary' in obj) {
            search.summary = {
                path: obj.summary['@path'],
                results: []
            };
            if('results' in obj.summary) {
                let results = modelHelper.getArray(obj.summary.results);
                results.forEach((result) => {
                    search.summary.results.push({
                        path: result['@path'],
                        count: modelHelper.getInt(result['@count']),
                        title: result['@title']
                    });
                });
            }
        }
        return search;
    }
};
export { searchModel };
