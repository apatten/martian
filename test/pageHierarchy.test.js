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
import {subpagesModel} from 'models/subpages.model';
import {PageHierarchy} from 'pageHierarchy';
describe('Page Hierarchy', () => {
    beforeEach(() => {
        spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
    });
    describe('constructor tests', () => {
        it('can create a new page hierarchy object', () => {
            let ph = new PageHierarchy();
            expect(ph).toBeDefined();
        });
        it('can create a new page hierarchy object with an article type whitelist', () => {
            let ph = new PageHierarchy([ 'topic-category', 'topic-guide' ]);
            expect(ph).toBeDefined();
        });
    });
    describe('operations', () => {
        let ph;
        beforeEach(() => {
            ph = new PageHierarchy();
        });
        afterEach(() => {
            ph = null;
        });
        it('can fetch the home page info explicitly', (done) => {
            spyOn(pageModel, 'parse').and.returnValue({ id: 123 });
            ph.getRoot('home').then((r) => {
                expect(r.id).toBe(123);
                done();
            });
        });
        it('can fetch the home page info implicitly', (done) => {
            spyOn(pageModel, 'parse').and.returnValue({ id: 123 });
            ph.getRoot().then((r) => {
                expect(r.id).toBe(123);
                done();
            });
        });
        it('can fetch the children of the home page implicitly', (done) => {
            spyOn(subpagesModel, 'parse').and.returnValue({ pageSubpage: [ '1', '2' ] });
            ph.getChildren().then((r) => {
                expect(r.length).toBe(2);
                done();
            });
        });
        it('can fetch the children of the home page explicitly', (done) => {
            spyOn(subpagesModel, 'parse').and.returnValue({ pageSubpage: [ '1', '2' ] });
            ph.getChildren('home').then((r) => {
                expect(r.length).toBe(2);
                done();
            });
        });
        it('can fetch the children of a page', (done) => {
            spyOn(subpagesModel, 'parse').and.returnValue({ pageSubpage: [ '1', '2' ] });
            ph.getChildren(123).then((r) => {
                expect(r.length).toBe(2);
                done();
            });
        });
        it('can fetch both the root info and subpages', (done) => {
            spyOn(pageModel, 'parse').and.returnValue({ id: 123 });
            spyOn(subpagesModel, 'parse').and.returnValue({ pageSubpage: [ '1', '2' ] });
            ph.getRootAndChildren(123).then((r) => {
                expect(Array.isArray(r)).toBe(true);
                expect(r[0].subpages).toBe(true);
                done();
            });
        });
        it('can fetch both the root info and subpages (raw mode)', (done) => {
            spyOn(pageModel, 'parse').and.returnValue({ id: 123 });
            spyOn(subpagesModel, 'parse').and.returnValue({ pageSubpage: [ '1', '2' ] });
            ph.getRootAndChildren(123, false).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
    describe('filtered operations', () => {
        let ph = null;
        beforeEach(() => {
            ph = new PageHierarchy([ 'topic-category', 'topic-guide' ]);
        });
        afterEach(() => {
            ph = null;
        });
        it('can fetch the children of a page after being constructed with a filter', (done) => {
            spyOn(subpagesModel, 'parse').and.returnValue([]);
            ph.getChildren(123).then((r) => {
                expect(r.length).toBe(0);
                done();
            });
        });
    });
});
