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
        pit('can fetch a translated string', () => {
            return sm.getResourceString({ key: 'Test.Resource.key' });
        });
        pit('can fetch a translated string with language supplied', () => {
            return sm.getResourceString({ key: 'Test.Resource.key', lang: 'en-us' });
        });
        pit('can fail if no resource key is supplied', () => {
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
        pit('can perform a default search', () => {
            return sm.search();
        });
        pit('can perform a search with some parameters', () => {
            return sm.search({ page: 123, tags: [ 'abc', '123' ], type: [ 'wiki', 'image' ] });
        });
        pit('can perform a search with some other parameters', () => {
            return sm.search({ path: 'foo/bar', q: 'search thing' });
        });
        pit('can perform a search with all parameters', () => {
            return sm.search({ path: '/foo/bar', tags: 'abc', type: 'wiki', page: 123, limit: 10, q: 'search term' });
        });
    });
});
