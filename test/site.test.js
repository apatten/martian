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
import {Plug} from 'lib/plug';
import {searchModel} from 'models/search.model';
import {Settings} from 'lib/settings';
import {Site} from 'site';
describe('Site API', () => {
    let settings = new Settings({
        host: 'https://www.example.com',
        token: 'abcd1234'
    });
    describe('construction', () => {
        it('fails when calling Site as a function', () => {
            expect(() => Site()).toThrow();
        });
        it('can attempt to construct a Site object', () => {
            let site1 = new Site();
            expect(site1).toBeDefined();
            let site2 = new Site(settings);
            expect(site2).toBeDefined();
        });
    });
    describe('resource string operations', () => {
        let sm = null;
        beforeEach(() => {
            sm = new Site(settings);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve('translated string'));
        });
        it('can fetch a translated string', (done) => {
            sm.getResourceString({ key: 'Test.Resource.key' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch a translated string with language supplied', (done) => {
            sm.getResourceString({ key: 'Test.Resource.key', lang: 'en-us' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail if no resource key is supplied', () => {
            sm.getResourceString().catch((e) => {
                expect(e).toBeDefined();
            });
        });
    });
    describe('search operations', () => {
        let sm = null;
        beforeEach(() => {
            sm = new Site(settings);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
        });
        afterEach(() => {
            sm = null;
        });
        it('can perform a default search', (done) => {
            spyOn(searchModel, 'parse').and.returnValue({});
            sm.search().then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can perform a search with some parameters', (done) => {
            spyOn(searchModel, 'parse').and.returnValue({});
            sm.search({ page: 123, tags: [ 'abc', '123' ], type: [ 'wiki', 'image' ] }).then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can perform a search with some other parameters', (done) => {
            spyOn(searchModel, 'parse').and.returnValue({});
            sm.search({ path: 'foo/bar', q: 'search thing' }).then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can perform a search with all parameters', (done) => {
            spyOn(searchModel, 'parse').and.returnValue({});
            sm.search({ path: '/foo/bar', tags: 'abc', type: 'wiki', page: 123, limit: 10, q: 'search term' }).then((e) => {
                expect(e).toBeDefined();
                done();
            });
        });
    });
});
