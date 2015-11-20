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
import PageProperty from 'pageProperty';
describe('Page Property', () => {
    describe('constructor tests', () => {
        it('can construct a PageProperty object', () => {
            let p = new PageProperty();
            expect(p).toBeDefined();
        });
    });
    describe('fetching tests', () => {
        let prop = null;
        beforeEach(() => {
            prop = new PageProperty(123);
            jasmine.Ajax.install();
        });
        afterEach(() => {
            prop = null;
            jasmine.Ajax.uninstall();
        });
        it('can fetch the properties from a page', (done) => {
            let propertiesUri = '/@api/deki/pages/123/properties?';
            jasmine.Ajax.stubRequest(new RegExp(propertiesUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pagePropertiesSingle });
            prop.getProperties().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch the properties from a page (multiple properties)', (done) => {
            let propertiesUri = '/@api/deki/pages/123/properties?';
            jasmine.Ajax.stubRequest(new RegExp(propertiesUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageProperties });
            prop.getProperties().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can filter properties by supplying a list of names', (done) => {
            let propertiesUri = '/@api/deki/pages/123/properties?';
            jasmine.Ajax.stubRequest(new RegExp(propertiesUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageProperties });
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
            let propertyUri = '/@api/deki/pages/123/properties/mindtouch.import%23info/info?';
            jasmine.Ajax.stubRequest(new RegExp(propertyUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageProperty });
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
        it('can fetch the contents of a single property', (done) => {
            let propertyUri = '/@api/deki/pages/123/properties/property1?';
            jasmine.Ajax.stubRequest(new RegExp(propertyUri), null, 'GET').andReturn({ status: 200, responseText: 'property contents' });
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
        it('can fetch properties from children of the root page', (done) => {
            let propertyUri = '/@api/deki/pages/123/properties?';
            jasmine.Ajax.stubRequest(new RegExp(propertyUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.childrenProperties });
            prop.getPropertyForChildren('property1').then((r) => {
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
    });
});
