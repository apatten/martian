/* eslint-env jasmine, jest */

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);
jest.unmock('../pageSecurity.js');
import { PageSecurity } from '../pageSecurity';

describe('Page Comment', () => {
    let page = null;
    beforeEach(() => {
        page = new PageSecurity(123);
    });
    it('can fail getting the pages security info', async () => {
        expect.assertions(1);
        return await expect(page.get()).rejects.toEqual(mockFailed);
    });
    it('can fail resetting the pages security info', async () => {
        expect.assertions(1);
        return await expect(page.reset()).rejects.toEqual(mockFailed);
    });
    it('can fail setting the pages security info', async () => {
        expect.assertions(1);
        return await expect(page.set({ pageRestriction: 'Public' })).rejects.toEqual(mockFailed);
    });
    it('can fail updating the pages security info', async () => {
        expect.assertions(1);
        return await expect(page.update()).rejects.toEqual(mockFailed);
    });
});
