/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);
jest.unmock('../pageProperty.js');
import { PageProperty } from '../pageProperty.js';

describe('Page Property', () => {
    let page = null;
    beforeEach(() => {
        page = new PageProperty();
    });
    it('can fail getting listing of page properties for a hierarchy of pages', async () => {
        expect.assertions(1);
        return await expect(page.getPropertyForChildren(123)).rejects.toEqual(undefined);
    });
});
