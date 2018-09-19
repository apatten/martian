import fetch from 'jest-fetch-mock';
import { Plug } from '../plug.js';
global.fetch = fetch;

describe('Plug JS', () => {
    describe('constructor', () => {
        it('can construct a Plug with defaults', () => {
            expect.assertions(2);
            const noSlashPlug = new Plug('http://example.com');
            expect(noSlashPlug.url).toBe('http://example.com/');
            const slashPlug = new Plug('http://example.com/');
            expect(slashPlug.url).toBe('http://example.com/');
        });
        it('will fail constructing a Plug without a URL specified', () => {
            expect(() => new Plug()).toThrowError('A full, valid URL must be specified');
        });
        it('will fail constructing a Plug with an invalid URL', () => {
            expect(() => new Plug('www.foo.com')).toThrowError('Unable to construct a URL object from www.foo.com');
        });
        it('can construct a Plug with all possible params', () => {
            expect.assertions(6);
            const cookieManager = {};
            const fetchImpl = {};
            const params = {
                uriParts: {
                    segments: ['dog', 'cat', 123],
                    query: { foo: 'bar', abc: 123, def: 456 },
                    excludeQuery: 'abc'
                },
                headers: {
                    'X-Deki-Token': 'abcd1234'
                },
                timeout: 200,
                cookieManager,
                fetchImpl,
                followRedirects: false
            };
            const p = new Plug('http://www.example.com', params);
            expect(p.url).toBe('http://www.example.com/dog/cat/123?foo=bar&def=456');
            const h = p.headers;
            expect(h).toBeInstanceOf(global.Headers);
            expect(h.get('X-Deki-Token')).toBe('abcd1234');
            expect(p._followRedirects).toBe(false);
            expect(p._cookieManager).toBe(cookieManager);
            expect(p._fetch).toBe(fetchImpl);
        });
        it('maintains params between Plug constructors', () => {
            expect.assertions(8);
            const cookieManager = {};
            const fetchImpl = {};
            const params = {
                uriParts: {
                    segments: ['dog', 'cat', 123],
                    query: { foo: 'bar', abc: 123, def: 456 },
                    excludeQuery: 'abc'
                },
                headers: {
                    'X-Deki-Token': 'abcd1234'
                },
                timeout: 200,
                cookieManager,
                fetchImpl,
                followRedirects: false
            };
            const p = new Plug('http://www.example.com', params)
                .at('/slash')
                .at('qux')
                .withParam('foo', 'bar')
                .withParams({
                    qux: 'fred'
                })
                .withoutParam('foo')
                .withHeader('X-Devo', 'Whip it')
                .withHeaders({
                    'X-Aphex-Twin': 'Come to Daddy'
                })
                .withoutHeader('X-Devo')
                .withFollowRedirects()
                .withoutFollowRedirects();
            expect(p.url).toBe('http://www.example.com/dog/cat/123/slash/qux?def=456&qux=fred');
            const h = p.headers;
            expect(h).toBeInstanceOf(global.Headers);
            expect(h.get('X-Deki-Token')).toBe('abcd1234');
            expect(h.get('X-Devo')).toBe(null);
            expect(h.get('X-Aphex-Twin')).toBe('Come to Daddy');
            expect(p._followRedirects).toBe(false);
            expect(p._cookieManager).toBe(cookieManager);
            expect(p._fetch).toBe(fetchImpl);
        });
    });
    describe('whatwg/fetch implementation', () => {
        afterEach(() => {
            fetch.resetMocks();
        });
        it('is global', async () => {
            expect.assertions(1);
            fetch.once('fetch text response');
            const plug = new Plug('http://example.com');
            const getResp = await plug.get();
            await expect(getResp.text()).resolves.toBe('fetch text response');
        });
        it('is dependency injected', async () => {
            expect.assertions(2);

            // Set up a mock on the "global" fetch
            fetch.once('This should not be called');

            // Create a dummy fetch implementation
            const fetchMock = jest.fn().mockImplementationOnce(() => Promise.resolve(new global.Response()));

            // Make a Plug call with the dummy passed in
            await new Plug('http://example.com', { fetchImpl: fetchMock })
                .at('qux')
                .withParam('foo', 'bar')
                .withParams({
                    qux: 'fred'
                })
                .withoutParam('foo')
                .withHeader('X-Devo', 'Whip it')
                .withHeaders({
                    'X-Aphex-Twin': 'Come to Daddy'
                })
                .withoutHeader('X-Devo')
                .withFollowRedirects()
                .withoutFollowRedirects()
                .get();

            // Ensure the dummy was called
            expect(fetchMock).toHaveBeenCalled();

            // Ensure the "global" fetch was not called
            expect(fetch.mock.calls.length).toBe(0);
        });
    });
    describe('URI construction', () => {
        let plug = null;
        beforeEach(() => {
            plug = new Plug('http://www.example.com');
        });
        afterEach(() => {
            plug = null;
        });
        it('can add segments', () => {
            expect.assertions(2);
            const p2 = plug.at('@api', 'foo', 'bar');
            expect(p2.url).toBe('http://www.example.com/@api/foo/bar');
            expect(plug.url).toBe('http://www.example.com/');
        });
        it('can add no query params', () => {
            expect.assertions(2);
            const newPlug = plug.withParams();
            expect(newPlug.url).toBe('http://www.example.com/');
            expect(plug.url).toBe('http://www.example.com/');
        });
        it('can add a single query param', () => {
            expect.assertions(2);
            const newPlug = plug.withParam('dog', 123);
            expect(newPlug.url).toBe('http://www.example.com/?dog=123');
            expect(plug.url).toBe('http://www.example.com/');
        });
        it('can add multiple query params', () => {
            expect.assertions(2);
            const newPlug = plug.withParams({ dog: 123, cat: 'def' });
            expect(newPlug.url).toBe('http://www.example.com/?dog=123&cat=def');
            expect(plug.url).toBe('http://www.example.com/');
        });
        it('can remove query params', () => {
            expect.assertions(2);
            const newPlug = plug.withParams({ dog: 123, cat: 'def' }).withoutParam('dog');
            expect(newPlug.url).toBe('http://www.example.com/?cat=def');
            expect(plug.url).toBe('http://www.example.com/');
        });
    });
    describe('headers handling', () => {
        let plug = null;
        beforeEach(() => {
            plug = new Plug('http://www.example.com');
        });
        afterEach(() => {
            plug = null;
        });
        it('can add a single header', () => {
            expect.assertions(2);
            const newPlug = plug.withHeader('Content-Type', 'application/json');
            expect(newPlug.headers.get('Content-Type')).toBe('application/json');
            expect(plug.headers.get('Content-Type')).toBeNull();
        });
        it('can add multiple headers', () => {
            expect.assertions(3);
            let newPlug = plug.withHeaders({
                'Content-Type': 'application/json',
                'X-Deki-Token': 'abcd1234'
            });
            expect(newPlug.headers.get('Content-Type')).toBe('application/json');
            expect(newPlug.headers.get('X-Deki-Token')).toBe('abcd1234');
            expect(plug.headers.get('Content-Type')).toBeNull();
        });
        it('can remove headers', () => {
            expect.assertions(3);
            const newPlug = plug
                .withHeaders({
                    'Content-Type': 'application/json',
                    'X-Deki-Token': 'abcd1234'
                })
                .withoutHeader('Content-Type');
            expect(newPlug.headers.get('Content-Type')).toBe(null);
            expect(newPlug.headers.get('X-Deki-Token')).toBe('abcd1234');
            expect(plug.headers.get('Content-Type')).toBeNull();
        });
    });
    describe('HTTP operations', () => {
        let p = null;
        beforeEach(() => {
            fetch.once('fetch mock response');
            p = new Plug('http://example.com/');
        });
        afterEach(() => {
            fetch.resetMocks();
            p = null;
        });
        describe('GET', () => {
            it('can do a basic GET request', async () => {
                expect.assertions(1);
                await expect(p.get()).resolves.toBeInstanceOf(global.Response);
            });
            it('can do a basic HEAD request', async () => {
                expect.assertions(1);
                await expect(p.head()).resolves.toBeInstanceOf(global.Response);
            });
            it('can do a basic OPTIONS request', async () => {
                expect.assertions(1);
                await expect(p.options()).resolves.toBeInstanceOf(global.Response);
            });
        });
        describe('POST', () => {
            it('can do a basic POST request', async () => {
                expect.assertions(1);
                await expect(p.post('{"foo": "BAZ"}', 'application/json')).resolves.toBeInstanceOf(global.Response);
            });
            it('can do a basic PUT request', async () => {
                expect.assertions(1);
                await expect(p.put('{"foo": "BAZ"}', 'application/json')).resolves.toBeInstanceOf(global.Response);
            });
            it('can do a basic DELETE request', async () => {
                expect.assertions(1);
                await expect(p.delete()).resolves.toBeInstanceOf(global.Response);
            });
        });
    });
    describe('beforeRequest handler', () => {
        let p = null;
        let mockBeforeRequest = jest.fn().mockReturnValueOnce({ url: 'http://example.com', method: 'GET' });
        beforeEach(() => {
            fetch.once('fetch mock response');
            p = new Plug('http://example.com/', { beforeRequest: mockBeforeRequest });
        });
        afterEach(() => {
            fetch.resetMocks();
            p = null;
        });
        it('can hook into the beforeRequest handler', async () => {
            expect.assertions(2);
            await expect(
                p
                    .at('foo', 'bar')
                    .withParam('dog', 'cat')
                    .withHeaders({ 'X-Some-Custom-Header': 'Hello' })
                    .get()
            ).resolves.toBeInstanceOf(global.Response);
            expect(mockBeforeRequest).toHaveBeenCalledWith({
                method: 'GET',
                headers: { 'X-Some-Custom-Header': 'Hello' },
                url: 'http://example.com/foo/bar?dog=cat'
            });
        });
    });
    describe('HTTP codes', () => {
        it('can fail with a 5xx error', async () => {
            expect.assertions(1);
            fetch.once('Fail', { status: 500 });
            const p = new Plug('http://example.com/');
            await expect(p.get()).rejects.toEqual({
                message: 'Internal Server Error',
                responseText: 'Fail',
                status: 500
            });
            fetch.resetMocks();
        });
        it('can pass with a 304 status', async () => {
            expect.assertions(1);
            fetch.once('Three Oh Four', { status: 304 });
            const getResp = await new Plug('http://example.com/').get();
            expect(getResp).toMatchObject({ status: 304, statusText: 'Not Modified', body: 'Three Oh Four' });
        });
    });
    describe('Not Following Redirects', () => {
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can disable follow redirects', () => {
            expect.assertions(2);
            const plugWithRedirects = new Plug('http://example.com', { followRedirects: true });
            expect(plugWithRedirects.followingRedirects).toBe(true);
            const plugWithoutRedirects = plugWithRedirects.withoutFollowRedirects();
            expect(plugWithoutRedirects.followingRedirects).toBe(false);
        });
        for (let { status, message } of [
            { status: 301, message: 'Moved Permanently' },
            { status: 302, message: 'Found' },
            { status: 303, message: 'See Other' },
            { status: 307, message: 'Temporary Redirect' },
            { status: 308, message: 'Permanent Redirect' }
        ]) {
            it(`can fail a ${status} status without location header`, async () => {
                expect.assertions(1);
                fetch.once('', { status });
                const p = new Plug('http://example.com', { followRedirects: false });
                await expect(p.get()).rejects.toEqual({ message, responseText: '', status });
            });
            it(`can allow a ${status} status with location header`, async () => {
                expect.assertions(1);
                fetch.once('', { headers: { location: 'https://bar.foo.com' }, status });
                const p = new Plug('http://example.com', { followRedirects: false });
                await expect(p.get()).resolves.toMatchObject({ status, statusText: message });
            });
        }
    });
    describe('Following Redirects', () => {
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can enable follow redirects', () => {
            expect.assertions(1);
            const plug = new Plug('http://example.com', { followRedirects: false }).withFollowRedirects();
            expect(plug._followRedirects).toBe(true);
        });
        for (let status of [301, 302, 303]) {
            it(`can follow a ${status} status GET redirect and set cookie`, async () => {
                expect.assertions(7);
                const cookieManager = require('../lib/cookieJar');
                const url = 'http://example.com/';
                const location = 'https://bar.foo.com';

                // Mock 2 consecutive fetch calls
                fetch
                    .once('redirect response', { url, status, headers: { location, 'set-cookie': 'authtoken="123"' } })
                    .once('resolved response', { status: 200 });
                const p = new Plug(url, { followRedirects: true, cookieManager });
                const resp = await p.post();

                // Ensure there were 2 fetch calls made
                await expect(fetch.mock.calls.length).toBe(2);

                // Ensure the requests were constructed correctly
                const redirectRequest = fetch.mock.calls[0][0];
                expect(redirectRequest.method).toBe('POST');
                expect(redirectRequest.url).toBe(url);
                const resolvedRequest = fetch.mock.calls[1][0];
                expect(resolvedRequest.method).toBe('GET');
                expect(resolvedRequest.url).toBe(location);

                // Ensure the response is successful
                expect(resp).toMatchObject({ status: 200, body: 'resolved response' });

                // Ensure the cookie was set correctly
                const cookie = await cookieManager.getCookieString(url);
                expect(cookie).toBe('authtoken="123"');
            });
        }
        for (let status of [307, 308]) {
            it(`can follow a ${status} status POST redirect and set cookie`, async () => {
                expect.assertions(7);
                const cookieManager = require('../lib/cookieJar');
                const url = 'http://example.com/';
                const location = 'https://bar.foo.com';
                fetch
                    .once('redirect response', { url, status, headers: { location, 'set-cookie': 'authtoken="123"' } })
                    .once('resolved response', { status: 200 });
                const p = new Plug(url, { followRedirects: true, cookieManager });
                const resp = await p.post();

                // Ensure there were 2 fetch calls made
                await expect(fetch.mock.calls.length).toBe(2);

                // Ensure the requests were constructed correctly
                const redirectRequest = fetch.mock.calls[0][0];
                expect(redirectRequest.method).toBe('POST');
                expect(redirectRequest.url).toBe(url);
                const resolvedRequest = fetch.mock.calls[1][0];
                expect(resolvedRequest.method).toBe('POST');
                expect(resolvedRequest.url).toBe(location);

                // Ensure the response is successful
                expect(resp).toMatchObject({ status: 200, body: 'resolved response' });

                // Ensure the cookie was set correctly
                const cookie = await cookieManager.getCookieString(url);
                expect(cookie).toBe('authtoken="123"');
            });
        }
    });
    describe('Cookie Jar', () => {
        const url = 'http://example.com/';
        const testCookie = 'value=this is a cookie value';
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can do requests with a cookie jar in place', async () => {
            expect.assertions(2);

            // Pretend the cookie jar has a cookie already set
            const cookieJar = {
                getCookieString: jest.fn().mockResolvedValueOnce(testCookie),
                storeCookies: jest.fn().mockResolvedValueOnce()
            };
            const plug = new Plug(url, { cookieManager: cookieJar });

            fetch.once('response', { url, headers: { 'Set-Cookie': testCookie } });
            await expect(plug.get()).resolves.toMatchObject({ status: 200 });
            expect(cookieJar.storeCookies).toHaveBeenCalledWith(url, [testCookie]);
        });
        it('can do requests with a cookie jar in place (empty cookie)', async () => {
            expect.assertions(2);

            // Pretend the cookie jar has no cookies set
            const cookieJar = {
                getCookieString: jest.fn().mockResolvedValueOnce(''),
                storeCookies: jest.fn().mockResolvedValueOnce()
            };
            fetch.once('response', { url });
            const plug = new Plug(url, { cookieManager: cookieJar });
            await expect(plug.get()).resolves.toMatchObject({ status: 200 });
            expect(cookieJar.storeCookies).toHaveBeenCalledWith(url, []);
        });
    });
});
