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
/* eslint-env jasmine, jest */
jest.unmock('../site.js');
import { Site } from '../site.js';

describe('Site API', () => {
    describe('construction', () => {
        it('can attempt to construct a Site object', () => {
            let site1 = new Site();
            expect(site1).toBeDefined();
        });
    });
    describe('resource string operations', () => {
        let sm = null;
        beforeEach(() => {
            sm = new Site();
        });
        afterEach(() => {
            sm = null;
        });
        it('can fetch a translated string', () => {
            return sm.getResourceString({ key: 'Test.Resource.key' });
        });
        it('can fetch a translated string with language supplied', () => {
            return sm.getResourceString({ key: 'Test.Resource.key', lang: 'en-us' });
        });
        it('can fail if no resource key is supplied', () => {
            return sm.getResourceString().then((r) => {
                expect(r).not.toBeDefined();
            }).catch(() => {});
        });
    });
    describe('search operations', () => {
        let sm = null;
        beforeEach(() => {
            sm = new Site();
        });
        afterEach(() => {
            sm = null;
        });
        it('can perform a default search', () => {
            return sm.search();
        });
        it('can perform a search with some parameters', () => {
            return sm.search({ tags: [ 'abc', '123' ], type: [ 'wiki', 'image' ] });
        });
        it('can perform a search with some other parameters', () => {
            return sm.search({ path: 'foo/bar', q: 'search thing' });
        });
        it('can perform a search with a namespace param', () => {
            return sm.search({ q: 'search term', namespaces: 'template' });
        });
        it('can perform a search with all parameters', () => {
            return sm.search({ path: '/foo/bar', tags: 'abc', type: 'wiki', offset: 123, limit: 10, q: 'search term', namespaces: [ 'main', 'template' ] });
        });
    });
    describe('search index tests', () => {
        let sm = null;
        beforeEach(() => {
            sm = new Site();
        });
        afterEach(() => {
            sm = null;
        });
        it('can search the site index with defaults', () => {
            return sm.searchIndex();
        });
        it('can search the site index with all parameters sent', () => {
            const params = {
                q: 'search query',
                limit: 'all',
                offset: 10,
                sortBy: 'date',
                verbose: false,
                constraints: {
                    page: 'Category_1',
                    tags: [ 'foo', 'bar' ],
                    type: 'wiki',
                    namespaces: [ 'main' ]
                }
            };
            return sm.searchIndex(params);
        });
        it('can search the site index with a constraint string passed', () => {
            return sm.searchIndex({ q: 'Foo', constraints: { type: 'wiki' }, constraintString: 'language:en-us AND type:wiki' });
        });
        it('can fail if an invalid `limit` parameter is passed in', () => {
            const success = jest.fn();
            return sm.searchIndex({ limit: 'foo' }).then(() => {
                success();
                throw new Error('Promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
    describe('site tags operations', () => {
        let sm = null;
        beforeEach(() => {
            sm = new Site();
        });
        afterEach(() => {
            sm = null;
        });
        it('can fetch all site tags', () => {
            return sm.getTags();
        });
        it('can update batch site tags (add only)', () => {
            return sm.setTags({ add: [ { name: 'foo', pageids: [ 123, 456 ] } ] });
        });
        it('can update batch site tags (remove only)', () => {
            return sm.setTags({ remove: [ { name: 'foo', pageids: [ 123, 456 ] } ] });
        });
        it('can update batch site tags (add and remove)', () => {
            return sm.setTags({ add: [ { name: 'foo', pageids: [ 123, 456 ] } ], remove: [ { name: 'foo', pageids: [ 123, 456 ] } ] });
        });
        it('can update batch site tags (empty request)', () => {
            return sm.setTags();
        });
    });
    describe('verify log endpoints', () => {
        let sm = null;
        beforeEach(() => {
            sm = new Site();
        });
        afterEach(() => {
            sm = null;
        });
        it('get available site activity log list', () => {
            return sm.getSiteActivityLogs();
        });
        it('get available search query log list', () => {
            return sm.getSearchQueryLogs();
        });
        it('get search query log url with empty parameters', () => {
            const success = jest.fn();
            return sm.getSearchQueryLogUrl().then(() => {
                success();
                throw new Error();
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('get site activity log url with empty parameters', () => {
            const success = jest.fn();
            return sm.getSiteActivityLogUrl().then(() => {
                success();
                throw new Error();
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('get search query log url', () => {
            return sm.getSearchQueryLogUrl('searchqueries-2016-10-000');
        });
        it('get site activity log url', () => {
            return sm.getSiteActivityLogUrl('searchqueries-2016-10-000');
        });
    });
    describe('site activity', () => {
        let site = null;
        beforeEach(() => {
            site = new Site();
        });
        afterEach(() => {
            site = null;
        });
        it('can fetch site activity', () => {
            return site.getActivity();
        });
        it('can fetch site activity with supplied since date', () => {
            const date = new Date('Wed, 07 Dec 2016 00:00:00');
            return site.getActivity(date);
        });
        it('can fail if an invalid since date is supplied', () => {
            const success = jest.fn();
            return site.getActivity('').then(() => {
                success();
                throw new Error();
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
});
