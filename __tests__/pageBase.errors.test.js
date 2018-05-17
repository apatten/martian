/* eslint-env jasmine, jest */
jest.unmock('../pageBase.js');
jest.unmock('../page.js');
import { Page } from '../page.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed),
        delete: () => Promise.reject(mockFailed)
    })
);

describe('Page Base', () => {
    let page = null;
    beforeEach(() => {
        page = new Page(123);
    });
    it('can fail getting full page info', async () => {
        expect.assertions(1);
        return await expect(page.getFullInfo()).rejects.toBeDefined();
    });
    it('can fail getting page contents', async () => {
        expect.assertions(1);
        return await expect(page.getContents()).rejects.toEqual(mockFailed);
    });
    it('can fail setting page contents', async () => {
        expect.assertions(1);
        return await expect(page.setContents('Sample contents')).rejects.toBeDefined();
    });
    it('can fail getting page files', async () => {
        expect.assertions(1);
        return await expect(page.getFiles()).rejects.toEqual(mockFailed);
    });
    it('can fail attaching files with no progress', async () => {
        expect.assertions(1);
        return await expect(page.attachFile('testName')).rejects.toEqual(mockFailed);
    });
    it('can fail getting overview', async () => {
        expect.assertions(1);
        return await expect(page.getOverview()).rejects.toEqual(mockFailed);
    });
    it('can fail setting overview', async () => {
        expect.assertions(1);
        return await expect(page.setOverview({ body: 'FOO' })).rejects.toEqual(mockFailed);
    });
    it('can fail getting page tags', async () => {
        expect.assertions(1);
        return await expect(page.getTags()).rejects.toEqual(mockFailed);
    });
    it('can fail setting page tags', async () => {
        expect.assertions(1);
        return await expect(page.setTags()).rejects.toEqual(mockFailed);
    });
    it('can fail getting recommended page tags', async () => {
        expect.assertions(1);
        return await expect(page.getRecommendedTags()).rejects.toBeDefined();
    });
    it('can fail getting diff between two versions', async () => {
        expect.assertions(1);
        return await expect(page.getDiff({ previous: 21, format: 'html' })).rejects.toBeDefined();
    });
    it('can fail getting related', async () => {
        expect.assertions(1);
        return await expect(page.getRelated()).rejects.toEqual(mockFailed);
    });
    it('can fail reverting', async () => {
        expect.assertions(1);
        return await expect(page.revert({ fromRevision: 5 })).rejects.toEqual(mockFailed);
    });
});
