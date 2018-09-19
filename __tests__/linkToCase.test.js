import fetch from 'jest-fetch-mock';
import { LinkToCase } from '../linkToCase.js';
global.fetch = fetch;

describe('LinkToCase API', () => {
    describe('operations', () => {
        beforeEach(() => {
            fetch.once('{}');
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can fail if a case ID is not supplied to the constructor', () => {
            expect.assertions(1);
            expect(() => new LinkToCase()).toThrow();
        });
        let ltc = null;
        beforeEach(() => {
            ltc = new LinkToCase('abcd12341');
        });
        afterEach(() => {
            ltc = null;
        });
        it('can get a blank list of linked pages', async () => {
            await expect(ltc.getPageLinks()).resolves.toEqual({ linkData: [] });
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('linkToCase API failure');
        beforeEach(() => {
            fetch.mockReject(mockFailed);
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        let ltc = null;
        beforeEach(() => {
            ltc = new LinkToCase('abcd12341');
        });
        it('can fail getting a blank list of linked pages', async () => {
            expect.assertions(1);
            return await expect(ltc.getPageLinks()).rejects.toEqual(mockFailed);
        });
    });
});
