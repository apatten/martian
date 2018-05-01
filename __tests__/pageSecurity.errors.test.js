/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
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
        return await expect(page.get()).rejects.toEqual(undefined);
    });
    it('can fail resetting the pages security info', async () => {
        expect.assertions(1);
        return await expect(page.reset()).rejects.toEqual(undefined);
    });
    it('can fail setting the pages security info', async () => {
        expect.assertions(1);
        return await expect(page.set({ pageRestriction: 'Public' })).rejects.toEqual(undefined);
    });
    it('can fail updating the pages security info', async () => {
        expect.assertions(1);
        return await expect(page.update()).rejects.toEqual(undefined);
    });
});
