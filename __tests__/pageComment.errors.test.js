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
jest.unmock('../pageComment.js');
import { PageCommentManager, PageComment } from '../pageComment.js';

describe('Page Comment', () => {
    let page = null;
    beforeEach(() => {
        page = new PageComment(123, 123);
    });
    it('can fail updating page comment', async () => {
        expect.assertions(1);
        return await expect(page.update()).rejects.toEqual(mockFailed);
    });
    it('can fail deleting page comment', async () => {
        expect.assertions(1);
        return await expect(page.delete()).rejects.toEqual(mockFailed);
    });
});

describe('Page Comment Manager', () => {
    let page = null;
    beforeEach(() => {
        page = new PageCommentManager();
    });
    it('can fail adding page comment', async () => {
        expect.assertions(1);
        return await expect(page.addComment('commentText')).rejects.toEqual(mockFailed);
    });
});
