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
jest.unmock('../pageProperty.js');
import { PageProperty } from '../pageProperty.js';

describe('Page Property', () => {
    let page = null;
    beforeEach(() => {
        page = new PageProperty();
    });
    it('can fail getting listing of page properties for a hierarchy of pages', async () => {
        expect.assertions(1);
        return await expect(page.getPropertyForChildren(123)).rejects.toEqual(mockFailed);
    });
});
