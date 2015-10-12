/**
 * MindTouch martian
 * Copyright (C) 2006-2015 MindTouch, Inc.
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

import Plug from 'lib/plug';
describe('Plug2', () => {
    describe('constructor', () => {
        it('will not construct a Plug with no URL provided', () => {
            let p = new Plug();
            expect(p).toBeDefined();
            expect(p.getUrl()).toBe('');
            expect(p.at('@api').getUrl()).toBe('/@api');
        });
        it('can create a Plug', () => {
            let p = new Plug('https://www.example.com');
            expect(p.getUrl()).toBe('https://www.example.com/');
        });
        it('can create a Plug from a complicated URL', () => {
            let p = new Plug('https://www.example.com/foo/bar/baz?a=b&c=d&e=f#1=2&3=4');
            expect(p.getUrl()).toBe('https://www.example.com/foo/bar/baz?a=b&c=d&e=f#1=2&3=4');
        });
        it('can construct a Plug with supplied headers', () => {
            let headers = { foo: 'bar' };
            let p = new Plug('https://www.example.com', { headers: headers });
            expect(p.getHeaders()).toEqual(headers);
        });
        it('can construct a Plug with extra construction parameters', () => {
            let params = {
                segments: [ 'bar', 'baz' ],
                query: { c: 'd', e: 'f' },
                excludeQuery: 'a'
            };
            let p = new Plug('https://www.example.com/foo?a=b', { constructionParams: params });
            expect(p.getUrl()).toBe('https://www.example.com/foo/bar/baz?c=d&e=f');
        });
    });
    describe('URI manipulation', () => {
        let p;
        beforeEach(() => {
            p = new Plug('https://www.example.com/foo?a=b', {
                headers: { 'Cache-Control': 'no-cache' }
            });
        });
        it('can add segments', () => {
            expect(p.at('bar', 'baz').getUrl()).toBe('https://www.example.com/foo/bar/baz?a=b');
            expect(p.getUrl()).toBe('https://www.example.com/foo?a=b');
        });
        it('can add a single query param', () => {
            expect(p.withParam('c', 'd').getUrl()).toBe('https://www.example.com/foo?a=b&c=d');
            expect(p.getUrl()).toBe('https://www.example.com/foo?a=b');
        });
        it('can add multiple query params', () => {
            expect(p.withParams({ c: 'd', e: 'f' }).getUrl()).toBe('https://www.example.com/foo?a=b&c=d&e=f');
            expect(p.getUrl()).toBe('https://www.example.com/foo?a=b');
        });
        it('can remove a query param', () => {
            expect(p.withoutParam('a').getUrl()).toBe('https://www.example.com/foo');
            expect(p.getUrl()).toBe('https://www.example.com/foo?a=b');
        });
        it('can add a header', () => {
            expect(p.withHeader('Front-End-Https', 'On').getHeaders()).toEqual({ 'Cache-Control': 'no-cache', 'Front-End-Https': 'On' });
            expect(p.getHeaders()).toEqual({ 'Cache-Control': 'no-cache' });
        });
        it('can add multiple headers', () => {
            expect(p.withHeaders({
                'Front-End-Https': 'On',
                'Content-Type': 'text/javascript'
            }).getHeaders()).toEqual({
                'Front-End-Https': 'On',
                'Content-Type': 'text/javascript',
                'Cache-Control': 'no-cache'
            });
            expect(p.getHeaders()).toEqual({ 'Cache-Control': 'no-cache' });
        });
        it('can remove a header', () => {
            expect(p.withoutHeader('Cache-Control').getHeaders()).toEqual({});
            expect(p.withoutHeader('fakeHeader').getHeaders()).toEqual({ 'Cache-Control': 'no-cache' });
            expect(p.getHeaders()).toEqual({ 'Cache-Control': 'no-cache' });
        });
    });
    describe('Ajax operations', () => {
        let p;
        let uri = 'https://www.example.com/foo';
        let uriMatcher = new RegExp(uri);
        beforeEach(() => {
            p = new Plug(uri, { raw: true });
            jasmine.Ajax.install();
        });
        afterEach(() => {
            jasmine.Ajax.uninstall();
        });
        it('can do a GET request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'GET').andReturn({ status: 200, responseText: 'Ajax Response' });
            p.get().then((r) => {
                expect(r).toBe('Ajax Response');
                done();
            });
        });
        it('can do a raw GET request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'GET').andReturn({ status: 200, responseText: 'Ajax Response' });
            p.getRaw().then((xhr) => {
                expect(xhr.status).toBe(200);
                done();
            });
        });
        it('can handle a 304 GET request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'GET').andReturn({ status: 304, responseText: 'Ajax Response' });
            p.get().then(() => {
                done();
            });
        });
        it('can handle a failing GET request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'GET').andReturn({ status: 500, responseText: '{ \"message\": \"internal error\" }' });
            p.get().catch((r) => {
                expect(r).toBeDefined();
                expect(r.message).toBe('internal error');
                expect(r.errorCode).toBe(500);
                done();
            });
        });
        it('can do a POST request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'POST').andReturn({ status: 200 });
            p.post().then(() => {
                done();
            });
        });
        it('can do a raw POST request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'POST').andReturn({ status: 200 });
            p.postRaw().then((xhr) => {
                expect(xhr.status).toBe(200);
                done();
            });
        });
        it('can handle a 304 POST request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'POST').andReturn({ status: 304 });
            p.post().then(() => {
                done();
            });
        });
        it('can handle a failing POST request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'POST').andReturn({ status: 500, responseText: '{ \"message\": \"internal error\" }' });
            p.post().catch((e) => {
                expect(e.message).toBe('internal error');
                expect(e.errorCode).toBe(500);
                done();
            });
        });
        it('can do a PUT request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'POST').andReturn({ status: 200 });
            p.put().then(() => {
                done();
            });
        });
        it('can do a raw PUT request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'POST').andReturn({ status: 200 });
            p.putRaw().then((xhr) => {
                expect(xhr.status).toBe(200);
                done();
            });
        });
        it('can handle a 304 PUT request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'POST').andReturn({ status: 304 });
            p.put().then(() => {
                done();
            });
        });
        it('can handle a failing PUT request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'POST').andReturn({ status: 500, responseText: '{ \"message\": \"internal error\" }' });
            p.put().catch((e) => {
                expect(e.message).toBe('internal error');
                expect(e.errorCode).toBe(500);
                done();
            });
        });
        it('can do a HEAD request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'HEAD').andReturn({ status: 200, responseText: 'Ajax Response' });
            p.head().then(() => {
                done();
            });
        });
        it('can do a raw HEAD request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'HEAD').andReturn({ status: 200, responseText: 'Ajax Response' });
            p.headRaw().then(xhr => {
                expect(xhr.status).toBe(200);
                done();
            });
        });
        it('can handle a 304 HEAD request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'HEAD').andReturn({ status: 304, responseText: 'Ajax Response' });
            p.head().then(() => {
                done();
            });
        });
        it('can handle a failing HEAD request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'HEAD').andReturn({ status: 500, responseText: 'Ajax Response' });
            p.head().catch(() => {
                done();
            });
        });
        it('can do an OPTIONS request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'OPTIONS').andReturn({ status: 200, responseText: 'Ajax Response' });
            p.options().then(() => {
                done();
            });
        });
        it('can do a raw OPTIONS request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'OPTIONS').andReturn({ status: 200, responseText: 'Ajax Response' });
            p.optionsRaw().then(xhr => {
                expect(xhr.status).toBe(200);
                done();
            });
        });
        it('can handle a 304 OPTIONS request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'OPTIONS').andReturn({ status: 304, responseText: 'Ajax Response' });
            p.options().then(() => {
                done();
            });
        });
        it('can handle a failing OPTIONS request', (done) => {
            jasmine.Ajax.stubRequest(uriMatcher, null, 'OPTIONS').andReturn({ status: 500, responseText: '{ \"message\": \"internal error\" }' });
            p.options().catch((e) => {
                expect(e.message).toBe('internal error');
                expect(e.errorCode).toBe(500);
                done();
            });
        });
    });
});
