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
import {pageModel} from 'models/page.model';
import {pageContentsModel} from 'models/pageContents.model';
import {subpagesModel} from 'models/subpages.model';
import {pageTreeModel} from 'models/pageTree.model';
import {pageTagsModel} from 'models/pageTags.model';
import {pageRatingModel} from 'models/pageRating.model';
import {pageFilesModel} from 'models/pageFiles.model';
import {Page} from 'page';
describe('Page', () => {
    describe('constructor tests', () => {
        it('can construct a new Page object using page ID', () => {
            var page = new Page(123);
            expect(page).toBeDefined();
        });
        it('can construct a new Page object using page path', () => {
            var page = new Page('foo/bar');
            expect(page).toBeDefined();
            expect(page._id).toBe('=foo%252Fbar');
        });
        it('can construct a new Page object using \'home\'', () => {
            var page = new Page('home');
            expect(page).toBeDefined();
            expect(page._id).toBe('home');
        });
        it('can construct a new Page object defaulting to \'home\'', () => {
            var page = new Page();
            expect(page).toBeDefined();
            expect(page._id).toBe('home');
        });
        it('can fail if the constructor is not called correctly', () => {
            expect(() => Page()).toThrow();
        });
    });
    describe('get stuff tests', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            spyOn(pageModel, 'parse').and.returnValue({});
        });
        afterEach(() => {
            page = null;
            jasmine.Ajax.uninstall();
        });
        it('can get the simple page info', (done) => {
            page.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the simple page info with params', (done) => {
            page.getInfo({ exclude: 'revision' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the page info', (done) => {
            page.getFullInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the page contents', (done) => {
            spyOn(pageContentsModel, 'parse').and.returnValue({});
            page.getContents().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the subpages', (done) => {
            spyOn(subpagesModel, 'parse').and.returnValue({});
            page.getSubpages().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the page tree', (done) => {
            spyOn(pageTreeModel, 'parse').and.returnValue({});
            page.getTree().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the tags', (done) => {
            spyOn(pageTagsModel, 'parse').and.returnValue({});
            page.getTags().then(() => {
                done();
            });
        });
        it('can get the user rating', (done) => {
            spyOn(pageRatingModel, 'parse').and.returnValue({});
            page.getRating().then(() => {
                done();
            });
        });
        it('can fetch a template rendered in the context of the Page', (done) => {
            spyOn(pageContentsModel, 'parse').and.returnValue({});
            page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch a template rendered in the context of the Page with supplied options', (done) => {
            spyOn(pageContentsModel, 'parse').and.returnValue({});
            page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage', { includes: 'overview' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch the page\'s files with default options', (done) => {
            spyOn(pageFilesModel, 'parse').and.returnValue({});
            page.getFiles().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch the page\'s files with supplied options', (done) => {
            spyOn(pageFilesModel, 'parse').and.returnValue({});
            page.getFiles({ limit: 200 }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
    describe('virtual page fetching', () => {
        it('can get a virtual page info', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.reject({ errorCode: 404, response: { '@virtual': true }}));
            spyOn(pageModel, 'parse').and.returnValue({});
            page.getFullInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get through virtual page checking when there is another failure', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.reject({ errorCode: 400 }));
            page.getFullInfo().catch((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
    describe('tree IDs fetching', () => {
        it('can get the ID path in the tree', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve('123,456,789'));
            page.getTreeIds().then((r) => {
                expect(r).toEqual([ 123, 456, 789 ]);
                done();
            });
        });
        it('can get the ID path in the tree (invalid data)', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve('this is not a list of IDs'));
            page.getTreeIds().catch((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
    describe('overview fetching', () => {
        it('can get the overview', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve(`{ "#text": "this is the overview" }`));
            page.getOverview().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the overview (invalid response)', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve(`this is invalid JSON`));
            page.getOverview().catch((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
    describe('page rating', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
            spyOn(Plug.prototype, 'post').and.returnValue(Promise.resolve({}));
            spyOn(pageRatingModel, 'parse').and.returnValue({});
        });
        it('can rate a page', (done) => {
            page.rate(1).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can reset a page rating implicitly', (done) => {
            page.rate().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail for invalid page rating values', () => {
            expect(() => page.rate('foo')).toThrow();
            expect(() => page.rate(10)).toThrow();
            expect(() => page.rate({ score: 1 })).toThrow();
            expect(() => page.rate(1, 'foo')).toThrow();
            expect(() => page.rate(1, 10)).toThrow();
            expect(() => page.rate(1, { score: 1 })).toThrow();
        });
    });
    describe('page view logging', () => {
        it('can log a page view', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'post').and.returnValue(Promise.resolve({}));
            page.logPageView().then(() => {
                done();
            });
        });
    });
});
