import fetch from 'jest-fetch-mock';
import { Api } from '../api.js';
global.fetch = fetch;

describe('API Module', () => {
    let api = null;
    beforeEach(() => {
        api = new Api();
    });
    describe('operations', () => {
        it('can verify a successful HTTP request', async () => {
            expect.assertions(1);
            await expect(api.http()).resolves.toBeInstanceOf(global.Response);
        });
        it('can verify a successful F1 request', async () => {
            expect.assertions(1);
            await expect(api.f1()).resolves.toBeInstanceOf(global.Response);
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('failed');
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can fail an HTTP request', async () => {
            expect.assertions(1);
            await expect(api.http()).rejects.toEqual(mockFailed);
        });
        it('can fail an F1 request', async () => {
            expect.assertions(1);
            await expect(api.f1()).rejects.toEqual(mockFailed);
        });
    });
});
