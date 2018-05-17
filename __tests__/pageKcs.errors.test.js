/* eslint-env jasmine, jest */
jest.unmock('../pageKcs.js');
import { PageKcs } from '../pageKcs.js';

let mockFailed = 'MOCK FAILED';

/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);

describe('PageKcs', () => {
    let kcs;
    beforeEach(() => {
        kcs = new PageKcs(150);
    });
    it('can fail getting kcs state', async () => {
        expect.assertions(1);
        return await expect(kcs.getState()).rejects.toEqual(mockFailed);
    });
    it('can fail setting a kcs state', async () => {
        expect.assertions(1);
        return await expect(kcs.setState()).rejects.toEqual(mockFailed);
    });
    it('can fail getting kcs valid transitions', async () => {
        expect.assertions(1);
        return await expect(kcs.getValidTransitions()).rejects.toEqual(mockFailed);
    });
    it('can fail initializing a kcs state', async () => {
        expect.assertions(1);
        return await expect(kcs.initialize()).rejects.toEqual(mockFailed);
    });
    it('can fail setting a kcs flag state', async () => {
        expect.assertions(1);
        return await expect(kcs.setFlag({ state: false }, 'flagDetail')).rejects.toEqual(mockFailed);
    });
});
