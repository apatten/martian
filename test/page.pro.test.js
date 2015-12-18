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
import PageApiPro from 'page.pro';
describe('Page Pro', () => {
    describe('constructor', () => {
        it('can construct a Page object with the default ID', () => {
            let p = new PageApiPro();
            expect(p).toBeDefined();
        });
        it('can construct a Page object with a numeric ID', () => {
            let p = new PageApiPro(123);
            expect(p).toBeDefined();
        });
        it('can construct a Page object with a path as ID', () => {
            let p = new PageApiPro('Page Title , / ? : @ & = + $ #');
            expect(p).toBeDefined();
            expect(p._id).toEqual('=Page%2520Title%2520%252C%2520%252F%2520%253F%2520%253A%2520%2540%2520%2526%2520%253D%2520%252B%2520%2524%2520%2523');
        });
    });
    describe('functions', () => {
        let page = null;
        beforeEach(() => {
            page = new PageApiPro(123);
            jasmine.Ajax.install();
        });
        afterEach(() => {
            page = null;
            jasmine.Ajax.uninstall();
        });
        it('can set the page overview', (done) => {
            let overviewUri = '/@api/deki/pages/123/overview?';
            jasmine.Ajax.stubRequest(new RegExp(overviewUri), null, 'POST').andReturn({ status: 200 });
            page.setOverview({ body: 'FOO' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail if no arguments are sent when setting the page overview', (done) => {
            page.setOverview().catch((r) => {
                expect(r.message).toBe('No overview body was supplied');
                done();
            });
        });
        it('can fail if an HTTP failure occurs when setting the page overview', (done) => {
            let overviewUri = '/@api/deki/pages/123/overview?';
            jasmine.Ajax.stubRequest(new RegExp(overviewUri), null, 'POST').andReturn({ status: 400 });
            page.setOverview({ body: 'FOO' }).catch((r) => {
                expect(r.errorCode).toBe(400);
                done();
            });
        });
        it('can move a page', (done) => {
            let moveUri = '/@api/deki/pages/123/move?';
            jasmine.Ajax.stubRequest(new RegExp(moveUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.pageMove });
            page.move({ to: 'foo/bar' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can move a page with a single result', (done) => {
            let moveUri = '/@api/deki/pages/123/move?';
            jasmine.Ajax.stubRequest(new RegExp(moveUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.pageMoveSingle });
            page.move({ to: 'foo/bar' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can move a page with an empty result', (done) => {
            let moveUri = '/@api/deki/pages/123/move?';
            jasmine.Ajax.stubRequest(new RegExp(moveUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.pageMoveEmpty });
            page.move({ to: 'foo/bar' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can move a page with no options provided', (done) => {
            let moveUri = '/@api/deki/pages/123/move?';
            jasmine.Ajax.stubRequest(new RegExp(moveUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.pageMove });
            page.move().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can handle a page move failure', (done) => {
            let moveUri = '/@api/deki/pages/123/move?';
            jasmine.Ajax.stubRequest(new RegExp(moveUri), null, 'POST').andReturn({ status: 400 });
            page.move({ to: 'foo/bar' }).catch((e) => {
                expect(e.message).toBe('Status 400 from request');
                done();
            });
        });
        it('can set the page contents', (done) => {
            let setUri = '/@api/deki/pages/123/contents?';
            jasmine.Ajax.stubRequest(new RegExp(setUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.pageSetContents });
            page.setContents('Sample contents').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can set the page contents with options', (done) => {
            let setUri = '/@api/deki/pages/123/contents?';
            jasmine.Ajax.stubRequest(new RegExp(setUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.pageSetContents });
            page.setContents('Sample contents', { edittime: 'now' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can handle setting the page contents conflict', (done) => {
            let setUri = '/@api/deki/pages/123/contents?';
            jasmine.Ajax.stubRequest(new RegExp(setUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.pageSetContentsConflict });
            page.setContents('Sample contents', { edittime: 'now', abort: 'never' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail when setting invalid page contents', (done) => {
            page.setContents({}).catch((e) => {
                expect(e.message).toBe('Contents should be string.');
                done();
            });
        });
    });
});
