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
jest.unmock('../pageBase.js');
jest.unmock('../page.js');
import { Page, PageManager } from '../page.js';

describe('Page', () => {
    describe('constructor tests', () => {
        it('can construct a new Page object using page ID', () => {
            var page = new Page(123);
            expect(page).toBeDefined();
        });
        it('can construct a new Page object using page path', () => {
            var page = new Page('foo/bar');
            expect(page).toBeDefined();
        });
        it('can construct a new Page object using \'home\'', () => {
            var page = new Page('home');
            expect(page).toBeDefined();
        });
        it('can construct a new Page object defaulting to \'home\'', () => {
            var page = new Page();
            expect(page).toBeDefined();
        });
        it('can fail if the constructor is not called correctly', () => {
            expect(() => Page()).toThrow();
        });
    });
    describe('get stuff tests', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
        });
        afterEach(() => {
            page = null;
        });
        it('can get the simple page info', () => {
            return page.getInfo();
        });
        it('can get the simple page info with params', () => {
            return page.getInfo({ exclude: 'revision' });
        });
        it('can get the page info', () => {
            return page.getFullInfo();
        });
        it('can get the page contents', () => {
            return page.getContents();
        });
        it('can get the subpages', () => {
            return page.getSubpages();
        });
        it('can get the page tree', () => {
            return page.getTree();
        });
        it('can get the tags', () => {
            return page.getTags();
        });
        it('can get the tags', () => {
            return page.setTags();
        });
        it('can get the user rating', () => {
            return page.getRating();
        });
        it('can fetch a template rendered in the context of the Page', () => {
            return page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage');
        });
        it('can fetch a template rendered in the context of the Page with supplied options', () => {
            return page.getHtmlTemplate('Template:MindTouch/IDF3/Controls/WelcomeMessage', { includes: 'overview' });
        });
        it('can fetch the page\'s files with default options', () => {
            return page.getFiles();
        });
        it('can fetch the page\'s files with supplied options', () => {
            return page.getFiles({ limit: 200 });
        });
        it('can get the diff for a page', () => {
            expect(() => page.getDiff()).toThrowError(Error);
        });
        it('can get the related pages', () => {
            return page.getRelated();
        });
        it('can get the page overview', () => {
            return page.getOverview();
        });
    });
    describe('page rating', () => {
        let page = null;
        beforeEach(() => {
            page = new Page(123);
        });
        afterEach(() => {
            page = null;
        });
        it('can rate a page', () => {
            return page.rate(1);
        });
        it('can reset a page rating implicitly', () => {
            return page.rate();
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
        });
        afterEach(() => {
            page = null;
        });
        it('can set the page overview', () => {
            return page.setOverview({ body: 'FOO' });
        });
        it('can fail if no arguments are sent when setting the page overview', () => {
            return page.setOverview().then((r) => {
                expect(r).not.toBeDefined();
            }).catch(() => {});
        });
        it('can move a page', () => {
            return page.move({ to: 'foo/bar' });
        });
        it('can move a page with no options provided', () => {
            return page.move();
        });
        it('can set the page contents', () => {
            return page.setContents('Sample contents');
        });
        it('can fail when setting invalid page contents', () => {
            return page.setContents({}).then((r) => {
                expect(r).not.toBeDefined();
            }).catch(() => {});
        });
        it('can handle setting the page contents conflict', () => {
            return page.setContents('Sample contents', { edittime: 'now', abort: 'never' });
        });
        it('can activate a draft for the page', () => {
            return page.activateDraft();
        });
        it('can delete a page', () => {
            return page.delete();
        });
        it('can delete pages recursively', () => {
            return page.delete(true);
        });
        xit('can attach a file to a page', () => {
            const f = new File([], 'test.jpg');
            return page.attachFile(f);
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
            it('can fetch the ratings for a set of pages', () => {
                return pm.getRatings([ 440, 441 ]);
            });
        });
    });
});
