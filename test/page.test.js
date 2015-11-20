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
import Page from 'page';
describe('Page', () => {
    describe('constructor tests', () => {
        it('can construct a new Page object', () => {
            var page = new Page(123);
            expect(page).toBeDefined();
        });
    });
    describe('get stuff tests', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
            jasmine.Ajax.install();
        });
        afterEach(() => {
            page = null;
            jasmine.Ajax.uninstall();
        });
        it('can get the simple page info', (done) => {
            let infoUri = '/@api/deki/pages/123/info?';
            jasmine.Ajax.stubRequest(new RegExp(infoUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageInfo });
            page.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can handle a simple page info request with bad JSON', (done) => {
            let infoUri = '/@api/deki/pages/123/info?';
            jasmine.Ajax.stubRequest(new RegExp(infoUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.invalidJson });
            page.getInfo().catch((r) => {
                expect(r).toBeDefined();
                expect(r.message).toBe('Unable to parse JSON string');
                done();
            });
        });
        it('can handle a simple page info request with HTTP failure', (done) => {
            let infoUri = '/@api/deki/pages/123/info?';
            jasmine.Ajax.stubRequest(new RegExp(infoUri), null, 'GET').andReturn({ status: 500, responseText: '{ \"message\": \"internal error\" }' });
            page.getInfo().catch((r) => {
                expect(r).toBeDefined();
                expect(r.errorCode).toBe(500);
                expect(r.message).toBe('internal error');
                done();
            });
        });
        it('can get the page info', (done) => {
            let fullInfoUri = '/@api/deki/pages/123?';
            jasmine.Ajax.stubRequest(new RegExp(fullInfoUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.page });
            page.getFullInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can handle a page info request that returns bad JSON', (done) => {
            let fullInfoUri = '/@api/deki/pages/123?';
            jasmine.Ajax.stubRequest(new RegExp(fullInfoUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.invalidJson });
            page.getFullInfo().catch((r) => {
                expect(r).toBeDefined();
                expect(r.message).toBe('Unable to parse JSON string');
                done();
            });
        });
        it('can get the subpages', (done) => {
            let subpagesUri = '/@api/deki/pages/123/subpages?';
            jasmine.Ajax.stubRequest(new RegExp(subpagesUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.subpages });
            page.getSubpages().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can handle a subpages request that returns bad JSON', (done) => {
            let subpagesUri = '/@api/deki/pages/123/subpages?';
            jasmine.Ajax.stubRequest(new RegExp(subpagesUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.invalidJson });
            page.getSubpages().catch((r) => {
                expect(r).toBeDefined();
                expect(r.message).toBe('Unable to parse JSON string');
                done();
            });
        });
        it('can get the page contents', (done) => {
            let contentsUri = '/@api/deki/pages/123/contents?';
            jasmine.Ajax.stubRequest(new RegExp(contentsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageContent });
            page.getContents().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can handle a page contents response that returns bad JSON', (done) => {
            let contentsUri = '/@api/deki/pages/123/contents?';
            jasmine.Ajax.stubRequest(new RegExp(contentsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.invalidJson });
            page.getContents().catch((r) => {
                expect(r).toBeDefined();
                expect(r.message).toBe('Unable to parse JSON string');
                done();
            });
        });
        it('can get the page tree', (done) => {
            let treeUri = '/@api/deki/pages/123/tree?';
            jasmine.Ajax.stubRequest(new RegExp(treeUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageTree });
            page.getTree().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can handle a page tree response that returns bad JSON', (done) => {
            let treeUri = '/@api/deki/pages/123/tree?';
            jasmine.Ajax.stubRequest(new RegExp(treeUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.invalidJson });
            page.getTree().catch((r) => {
                expect(r).toBeDefined();
                expect(r.message).toBe('Unable to parse JSON string');
                done();
            });
        });
        it('can get the ID path in the tree', (done) => {
            let treeUri = '/@api/deki/pages/123/tree?';
            jasmine.Ajax.stubRequest(new RegExp(treeUri), null, 'GET').andReturn({ status: 200, responseText: '123,456,789' });
            page.getTreeIds().then((r) => {
                expect(r).toEqual([ 123, 456, 789]);
                done();
            });
        });
        it('can handle an invalid tree IDs response', (done) => {
            let treeUri = '/@api/deki/pages/123/tree?';
            jasmine.Ajax.stubRequest(new RegExp(treeUri), null, 'GET').andReturn({ status: 200, responseText: 'this is not a list of IDs' });
            page.getTreeIds().catch((r) => {
                expect(r).toBeDefined();
                expect(r.message).toBe('Unable to parse the tree IDs.');
                done();
            });
        });
        it('can get the tags', (done) => {
            let tagsUri = '/@api/deki/pages/123/tags?';
            jasmine.Ajax.stubRequest(new RegExp(tagsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageTags });
            page.getTags().then(() => {
                done();
            });
        });
        it('can handle a tags response with bad JSON', (done) => {
            let tagsUri = '/@api/deki/pages/123/tags?';
            jasmine.Ajax.stubRequest(new RegExp(tagsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.invalidJson });
            page.getTags().catch(r => {
                expect(r).toBeDefined();
                expect(r.message).toBe('Unable to parse JSON string');
                done();
            });
        });
        it('can get the overview', (done) => {
            let overviewUri = '/@api/deki/pages/123/overview?';
            jasmine.Ajax.stubRequest(new RegExp(overviewUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageOverview });
            page.getOverview().then(() => {
                done();
            });
        });
        it('can get the user rating', (done) => {
            let ratingUri = '/@api/deki/pages/123/ratings?';
            jasmine.Ajax.stubRequest(new RegExp(ratingUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageRating });
            page.getRating().then(() => {
                done();
            });
        });
        it('can log a page view', (done) => {
            let viewUri = '/@api/deki/events/page-view/123?';
            jasmine.Ajax.stubRequest(new RegExp(viewUri), null, 'POST').andReturn({ status: 200 });
            page.logPageView().then(() => {
                done();
            });
        });
        it('can rate a page', (done) => {
            let rateUri = '/@api/deki/pages/123/ratings?';
            jasmine.Ajax.stubRequest(new RegExp(rateUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.pageRating });
            page.rate({ score: 1 }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch a template rendered in the context of the Page', (done) => {
            let contentsUri = '/@api/deki/pages/=Template%253AMindTouch%252FIDF3%252FControls%252FWelcomeMessage/contents?';
            jasmine.Ajax.stubRequest(new RegExp(contentsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageContent });
            page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch the page\'s files', (done) => {
            let filesUri = '/@api/deki/pages/123/files?';
            jasmine.Ajax.stubRequest(new RegExp(filesUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageFiles });
            page.getFiles({ limit: 200 }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
