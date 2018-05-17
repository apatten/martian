/* eslint-env jasmine, jest */
jest.unmock('../pageBase.js');
jest.unmock('../page.js');
import { Page } from '../page.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/progressPlug.js', () =>
    require.requireActual('../__mocks__/customProgressPlug.js')({
        put: () => Promise.reject(mockFailed)
    })
);

describe('Page Base', () => {
    let page = null;
    beforeEach(() => {
        page = new Page(123);
    });
    it('can fail attaching a file to a page (with progress)', async () => {
        return await expect(
            page.attachFile({}, { name: 'test.jpg', type: 'image/jpg', size: 1000, progress: () => {} })
        ).rejects.toEqual(mockFailed);
    });
});
