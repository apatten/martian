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
import Site from 'site';
describe('Site API', () => {
    describe('construction', () => {
        it('fails when calling Site as a function', () => {
            expect(() => Site()).toThrow();
        });
        it('can attempt to construct a Site object', () => {
            let site = new Site();
            expect(site).toBeDefined();
        });
    });
    describe('static operations', () => {
        beforeEach(() => {
            jasmine.Ajax.install();
        });
        afterEach(() => {
            jasmine.Ajax.uninstall();
        });
        it('can fetch a translated string', (done) => {
            let locUri = '/@api/deki/site/localization/Test.Resource.key?';
            jasmine.Ajax.stubRequest(new RegExp(locUri), null, 'GET').andReturn({ status: 200, responseText: 'Translated string' });
            Site.getResourceString({ key: 'Test.Resource.key' }).then((r) => {
                expect(r).toBe('Translated string');
                done();
            });
        });
        it('can fetch a translated string with language supplied', (done) => {
            let locUri = '/@api/deki/site/localization/Test.Resource.key?';
            jasmine.Ajax.stubRequest(new RegExp(locUri), null, 'GET').andReturn({ status: 200, responseText: 'Translated string' });
            Site.getResourceString({ key: 'Test.Resource.key', lang: 'en-us' }).then((r) => {
                expect(r).toBe('Translated string');
                done();
            });
        });
        it('can fail if no resource key is supplied', () => {
            Site.getResourceString().catch((e) => {
                expect(e).toBeDefined();
            });
        });
        it('can perform a default search', (done) => {
            let searchUri = '/@api/deki/site/query?';
            jasmine.Ajax.stubRequest(new RegExp(searchUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.search });
            Site.search().then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can perform a search with some parameters', (done) => {
            let searchUri = '/@api/deki/site/query?';
            jasmine.Ajax.stubRequest(new RegExp(searchUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.search });
            Site.search({ page: 123, tags: [ 'abc', '123' ] }).then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can perform a search with some other parameters', (done) => {
            let searchUri = '/@api/deki/site/query?';
            jasmine.Ajax.stubRequest(new RegExp(searchUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.search });
            Site.search({ path: 'foo/bar', q: 'search thing' }).then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can perform a search with all parameters', (done) => {
            let searchUri = '/@api/deki/site/query?';
            jasmine.Ajax.stubRequest(new RegExp(searchUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.search });
            Site.search({ path: '/foo/bar', tags: 'abc', page: 123, limit: 10, q: 'search term' }).then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can perform a search that returns a single result', (done) => {
            let searchUri = '/@api/deki/site/query?';
            jasmine.Ajax.stubRequest(new RegExp(searchUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.searchSingle });
            Site.search({ path: '/foo/bar', tags: 'abc', page: 123, limit: 10, q: 'search term' }).then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can perform a search that returns no results', (done) => {
            let searchUri = '/@api/deki/site/query?';
            jasmine.Ajax.stubRequest(new RegExp(searchUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.searchEmpty });
            Site.search({ path: '/foo/bar', tags: 'abc', page: 123, limit: 10, q: 'search term' }).then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
    });
});
