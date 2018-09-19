import { ProgressPlug } from '../progressPlug.js';
import fetch from 'jest-fetch-mock';
import mock from 'xhr-mock';
global.fetch = fetch;
const xhrMock = mock;

describe('ProgressPlug', () => {
    const testUrl = 'https://example.com/foo/bar';
    describe('constructor', () => {
        it('can create a new ProgressPlug', () => {
            const plug = new ProgressPlug(testUrl);
            expect(plug).toBeInstanceOf(ProgressPlug);
        });
    });
    describe('instance', () => {
        const callback = jest.fn();
        let plug;
        beforeEach(() => {
            xhrMock.setup();
            plug = new ProgressPlug(testUrl);
        });
        afterEach(() => {
            xhrMock.teardown();
            plug = null;
            callback.mockReset();
        });
        it('can do a POST', async () => {
            xhrMock.post(/foo\/bar/, (req, res) => res.status(200).body('mock POST success'));
            await expect(plug.post('POST Test', 'text/plain', 'POST', { size: 1000, callback })).resolves.toMatchObject(
                { res: { _body: 'mock POST success', _status: 200 } }
            );
            expect(callback).toHaveBeenNthCalledWith(1, { loaded: 0, total: 1000 });
            expect(callback).toHaveBeenLastCalledWith({ loaded: 1000, total: 1000 });
        });
        it('can do a POST (no params)', async () => {
            xhrMock.post(/foo\/bar/, (req, res) => res.status(200).body('mock POST success'));
            await expect(plug.post()).resolves.toMatchObject({
                res: { _body: 'mock POST success' }
            });
            expect(callback).not.toHaveBeenCalled();
        });
        it('can do a PUT', async () => {
            xhrMock.put(/foo\/bar/, (req, res) => res.status(200).body('mock PUT success'));
            await expect(plug.put('PUT Test', 'text/plain', { size: 1000, callback })).resolves.toMatchObject({
                res: { _body: 'mock PUT success' }
            });
            expect(callback).toHaveBeenNthCalledWith(1, { loaded: 0, total: 1000 });
            expect(callback).toHaveBeenLastCalledWith({ loaded: 1000, total: 1000 });
        });
    });
    describe('cookies', () => {
        beforeEach(() => {
            xhrMock.setup();
        });
        afterEach(() => {
            xhrMock.teardown();
        });
        it('can work with a cookie manager that has a cookie', async () => {
            const cookieManager = {
                getCookieString: jest.fn().mockResolvedValueOnce("that's good enough for me"),
                storeCookies: jest.fn().mockResolvedValueOnce()
            };
            xhrMock.post(/foo\/bar/, (req, res) =>
                res
                    .status(200)
                    .headers({ 'Set-Cookie': 'Test set cookie' })
                    .body('mock POST With Cookie success')
            );
            const plug = new ProgressPlug(testUrl, { cookieManager });
            await expect(plug.post()).resolves.toMatchObject({
                res: { _body: 'mock POST With Cookie success', _status: 200 }
            });
            expect(cookieManager.getCookieString).toHaveBeenCalledWith(testUrl);
            expect(cookieManager.storeCookies).toHaveBeenCalledWith(testUrl, 'Test set cookie');
        });
        it('can work with a cookie manager that does not have a cookie', async () => {
            const cookieManager = {
                getCookieString: jest.fn().mockResolvedValueOnce(''),
                storeCookies: jest.fn().mockResolvedValueOnce()
            };
            xhrMock.post(/foo\/bar/, (req, res) =>
                res
                    .status(200)
                    .headers({ 'Set-Cookie': 'Test set cookie' })
                    .body('mock POST Without Cookie success')
            );
            const plug = new ProgressPlug(testUrl, { cookieManager });
            await expect(plug.post()).resolves.toMatchObject({
                res: { _body: 'mock POST Without Cookie success', _status: 200 }
            });
            expect(cookieManager.getCookieString).toHaveBeenCalledWith(testUrl);
            expect(cookieManager.storeCookies).toHaveBeenCalledWith(testUrl, 'Test set cookie');
        });
    });
    describe('errors', () => {
        it('can fail a request with an error HTTP status code', async () => {
            xhrMock.setup();
            xhrMock.post(/foo\/bar/, (req, res) => res.status(500).body('mock POST failure'));
            const plug = new ProgressPlug(testUrl);
            await expect(plug.post()).rejects.toMatchObject({ responseText: 'mock POST failure', status: 500 });
            xhrMock.teardown();
        });
        it('can fail a request with an XHR error', async () => {
            const mockErrorLog = jest.fn();
            xhrMock.setup();
            xhrMock.post(/foo\/bar/, () => Promise.reject(new Error('FAIL')));
            const plug = new ProgressPlug(testUrl);
            xhrMock.error(mockErrorLog);
            await expect(plug.post()).rejects.toBeDefined();
            expect(mockErrorLog).toHaveBeenCalled();
            xhrMock.teardown();
        });
    });
});
