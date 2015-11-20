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
import Uri from 'uri';
describe('URI', () => {
    describe('constructor tests', () => {
        it('can construct a plain URI', () => {
            let uri = new Uri('http://www.example.com');
            expect(uri).toBeDefined();
        });
        it('can construct an empty URI', () => {
            let uri = new Uri();
            expect(uri).toBeDefined();
        });
    });
    describe('functionality', () => {
        var uri = null;
        beforeEach(() => {
            uri = new Uri('https://www.example.com/foo/bar?dog=cat&llama=goat#abcd=1234&defg=5678');
        });
        afterEach(() => {
            uri = null;
        });
        describe('read tests', () => {
            it('can convert to a string', () => {
                expect(uri.toString()).toBe('https://www.example.com/foo/bar?dog=cat&llama=goat#abcd=1234&defg=5678');
            });
            it('can fetch the protocol', () => {
                expect(uri.getProtocol()).toBe('https:');
            });
            it('can fetch the path', () => {
                expect(uri.path()).toBe('/foo/bar');
            });
            it('can fetch the query parameters', () => {
                expect(uri.query()).toBe('?dog=cat&llama=goat');
            });
            it('can fetch a query param value', () => {
                expect(uri.getQueryParamValue('dog')).toBe('cat');
                expect(uri.getQueryParamValue('notthere')).toBe(null);
            });
            it('can fetch the hash parameters', () => {
                expect(uri.getUriHash()).toBeDefined();
            });
            it('can fetch the origin segment', () => {
                expect(uri.origin()).toBe('https://www.example.com');
            });
            it('can fetch the path segments', () => {
                expect(uri.getSegments()).toEqual([ 'foo', 'bar' ]);
            });
        });
        describe('manipulation tests', () => {
            it('can add path segments', () => {
                uri.addSegments('new', 'segment');
                expect(uri.toString()).toBe('https://www.example.com/foo/bar/new/segment?dog=cat&llama=goat#abcd=1234&defg=5678');
            });
            it('can add path segments (complex)', () => {
                uri.addSegments('new', [ 'segment', 'with' ], 'array', [ 'arguments' ]);
                expect(uri.toString()).toBe('https://www.example.com/foo/bar/new/segment/with/array/arguments?dog=cat&llama=goat#abcd=1234&defg=5678');
            });
            it('can add query parameters', () => {
                var uri2 = uri.addQueryParam('new', 'param');
                expect(uri2.query()).toBe('?dog=cat&llama=goat&new=param');
                expect(uri2.getQueryParamValue('new')).toBe('param');
            });
            it('can add query parameters', () => {
                var uri2 = uri.withParam('new', 'param');
                expect(uri2.query()).toBe('?dog=cat&llama=goat&new=param');
                expect(uri2.getQueryParamValue('new')).toBe('param');
            });
            it('can batch-add query params', () => {
                expect(uri.addQueryParams({ a: '1', b: '2', c: '3' }).query()).toBe('?dog=cat&llama=goat&a=1&b=2&c=3');
            });
            it('can remove query parameters', () => {
                expect(uri.removeQueryParam('llama').toString()).toBe('https://www.example.com/foo/bar?dog=cat#abcd=1234&defg=5678');
            });
        });
    });
});
