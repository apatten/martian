/* eslint-env jasmine, jest */
jest.unmock('../pageProperty.js');
jest.unmock('../pagePropertyBase.js');

import { PageProperty } from '../pageProperty.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);

describe('Page Property', () => {
    let page = null;
    beforeEach(() => {
        page = new PageProperty();
    });
    it('can fail getting listing of page properties for a hierarchy of pages', async () => {
        expect.assertions(1);
        return await expect(page.getProperties(['propName'])).rejects.toEqual(mockFailed);
    });
    it('can fail getting listing of page property contents', async () => {
        expect.assertions(1);
        return await expect(page.getPropertyContents(123)).rejects.toEqual(mockFailed);
    });
    it('can fail getting single page property', async () => {
        expect.assertions(1);
        return await expect(page.getProperty(123)).rejects.toEqual(mockFailed);
    });
    it('can fail setting page property on the page', async () => {
        expect.assertions(1);
        return await expect(
            page.setProperty('property1', { text: 'property text', type: 'text/plain' })
        ).rejects.toEqual(mockFailed);
    });
    it('can fail deleting page property on the page', async () => {
        expect.assertions(1);
        return await expect(page.deleteProperty(123)).rejects.toEqual(mockFailed);
    });
});
