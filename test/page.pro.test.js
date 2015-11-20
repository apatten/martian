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
            let p = new PageApiPro('foo/bar');
            expect(p).toBeDefined();
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
        it('can handle a page move failure', (done) => {
            let moveUri = '/@api/deki/pages/123/move?';
            jasmine.Ajax.stubRequest(new RegExp(moveUri), null, 'POST').andReturn({ status: 400 });
            page.move({ to: 'foo/bar' }).catch((e) => {
                expect(e.message).toBe('Status 400 from request');
                done();
            });
        });
    });
});
