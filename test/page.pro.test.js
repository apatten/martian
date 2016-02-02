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
import {pageMoveModel} from 'models/pageMove.model';
import {pageEditModel} from 'models/pageEdit.model';
import {PagePro} from 'page.pro';
describe('Page Pro', () => {
    describe('constructor', () => {
        it('can construct a Page object with the default ID', () => {
            let p = new PagePro();
            expect(p).toBeDefined();
        });
        it('can construct a Page object with a numeric ID', () => {
            let p = new PagePro(123);
            expect(p).toBeDefined();
        });
        it('can construct a Page object with a path as ID', () => {
            let p = new PagePro('Page Title , / ? : @ & = + $ #');
            expect(p).toBeDefined();
            expect(p._id).toEqual('=Page%2520Title%2520%252C%2520%252F%2520%253F%2520%253A%2520%2540%2520%2526%2520%253D%2520%252B%2520%2524%2520%2523');
        });
    });
    describe('functions', () => {
        let page = null;
        beforeEach(() => {
            page = new PagePro(123);
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
            spyOn(pageMoveModel, 'parse').and.returnValue({});
            page.move({ to: 'foo/bar' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can move a page with no options provided', (done) => {
            spyOn(pageMoveModel, 'parse').and.returnValue({});
            page.move().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can set the page contents', (done) => {
            spyOn(pageEditModel, 'parse').and.returnValue({});
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
            spyOn(pageEditModel, 'parse').and.returnValue({});
            page.setContents('Sample contents', { edittime: 'now', abort: 'never' }).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
