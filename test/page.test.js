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
import { Plug } from '../lib/plug';
import { modelParser } from '../lib/modelParser';
import { Page, PageManager } from '../page';

describe('Page', () => {
    beforeEach(() => {
        spyOn(modelParser, 'createParser').and.returnValue((parsed) => {
            if(parsed && typeof parsed === 'object') {
                return parsed;
            }
        });
    });
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
        });
        afterEach(() => {
            page = null;
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
            page.getContents().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the subpages', (done) => {
            page.getSubpages().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the page tree', (done) => {
            page.getTree().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the tags', (done) => {
            page.getTags().then(() => {
                done();
            });
        });
        it('can get the user rating', (done) => {
            page.getRating().then(() => {
                done();
            });
        });
        it('can fetch a template rendered in the context of the Page', (done) => {
            page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch a template rendered in the context of the Page with supplied options', (done) => {
            page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage', { includes: 'overview' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch the page\'s files with default options', (done) => {
            page.getFiles().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch the page\'s files with supplied options', (done) => {
            page.getFiles({ limit: 200 }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the diff for a page', (done) => {
            expect(() => page.getDiff()).toThrowError(Error);
            done();
        });
        it('can get the related pages', (done) => {
            page.getRelated().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
    describe('virtual page fetching', () => {
        it('can get a virtual page info', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.reject({ errorCode: 404, response: { '@virtual': true } }));
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

            // eslint-disable-next-line quotes
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve(`{ "#text": "this is the overview" }`));
            page.getOverview().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the overview (invalid response)', (done) => {
            let page = new Page(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve('this is invalid JSON'));
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
    describe('Pro functions', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
            spyOn(Plug.prototype, 'put').and.returnValue(Promise.resolve({}));
            spyOn(Plug.prototype, 'post').and.returnValue(Promise.resolve({}));
        });
        afterEach(() => {
            page = null;
        });
        it('can set the page overview', (done) => {
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
        it('can move a page', (done) => {
            page.move({ to: 'foo/bar' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can move a page with no options provided', (done) => {
            page.move().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can set the page contents', (done) => {
            page.setContents('Sample contents').then((r) => {
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
        it('can handle setting the page contents conflict', (done) => {
            page.setContents('Sample contents', { edittime: 'now', abort: 'never' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can activate a draft for the page', (done) => {
            page.activateDraft().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
    describe('Page manager', () => {
        describe('functional tests', () => {
            let pm = null;
            beforeEach(() => {
                pm = new PageManager();
            });
            afterEach(() => {
                pm = null;
            });
            it('can fetch the ratings for a set of pages', (done) => {
                spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
                pm.getRatings([ 440, 441 ]).then((r) => {
                    expect(r).toBeDefined();
                    done();
                });
            });
        });
    });
});
