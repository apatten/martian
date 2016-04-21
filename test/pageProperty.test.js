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
import { PageProperty } from '../pageProperty';

describe('Page Property', () => {
    beforeEach(() => {
        spyOn(modelParser, 'createParser').and.returnValue((parsed) => {
            if(parsed && typeof parsed === 'object') {
                return parsed;
            }
        });
    });
    describe('constructor tests', () => {
        it('can construct a PageProperty object for the home page implicitly', () => {
            let p = new PageProperty();
            expect(p).toBeDefined();
        });
        it('can construct a PageProperty object for the home page explicitly', () => {
            let p = new PageProperty('home');
            expect(p).toBeDefined();
        });
        it('can construct a PageProperty object by page ID', () => {
            let p = new PageProperty(123);
            expect(p).toBeDefined();
        });
        it('can construct a PageProperty object by page path', () => {
            let p = new PageProperty('foo/bar');
            expect(p).toBeDefined();
        });
        it('can fail if the constructor is not called correctly', () => {
            expect(() => PageProperty()).toThrow();
        });
    });
    describe('fetching tests', () => {
        let prop = null;
        beforeEach(() => {
            prop = new PageProperty(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
        });
        afterEach(() => {
            prop = null;
        });
        it('can fetch the properties from a page', (done) => {
            prop.getProperties().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can filter properties by supplying a list of names', (done) => {
            prop.getProperties([ 'property1', 'property2' ]).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can can fail gracefully if supplying an invalid name filter', (done) => {
            prop.getProperties('property1').catch((e) => {
                expect(e.message).toBe('The property names must be an array');
                done();
            });
        });
        it('can fetch a single property', (done) => {
            prop.getProperty('mindtouch.import#info').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail gracefully if a key is not supplied when fetching a single property', (done) => {
            prop.getProperty().catch((e) => {
                expect(e.message).toBe('Attempting to fetch a page property without providing a property key');
                done();
            });
        });
        it('can fetch properties from children of the root page', (done) => {
            prop.getPropertyForChildren('property1').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch properties from children of the root page, and with a supplied depth', (done) => {
            prop.getPropertyForChildren('property1', 2).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail gracefully if a key is not supplied when fetching children properties', (done) => {
            prop.getPropertyForChildren().catch((e) => {
                expect(e.message).toBe('Attempting to fetch properties for children without providing a property key');
                done();
            });
        });
        it('can fetch the contents of a single property', (done) => {
            prop.getPropertyContents('property1').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fail gracefully if a key is not supplied when fetching the contents of a property', (done) => {
            prop.getPropertyContents().catch((e) => {
                expect(e.message).toBe('Attempting to fetch a page property contents without providing a property key');
                done();
            });
        });
    });
});
