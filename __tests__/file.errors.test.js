/* eslint-env jasmine, jest */
jest.unmock('../file.js');
import { File } from '../file.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);

describe('File API', () => {
    let file = null;
    beforeEach(() => {
        file = new File(123);
    });
    it('can fail fetching file info', async () => {
        expect.assertions(1);
        return await expect(file.getInfo()).rejects.toEqual(mockFailed);
    });
    it('can fail fetching file revisions', async () => {
        expect.assertions(1);
        return await expect(file.getRevisions()).rejects.toEqual(mockFailed);
    });
    it('can fail setting the file description', async () => {
        expect.assertions(1);
        return await expect(file.setDescription()).rejects.toEqual(mockFailed);
    });
    it('can fail deleting a file', async () => {
        expect.assertions(1);
        return await expect(file.delete()).rejects.toEqual(mockFailed);
    });
    it('can fail adding a file revision with no progress', async () => {
        expect.assertions(1);
        return await expect(file.addRevision('fileObj')).rejects.toEqual(mockFailed);
    });
    it('can fail moving a file', async () => {
        expect.assertions(1);
        return await expect(file.move({ to: 'foo/bar', name: 'image.jpg' })).rejects.toBeDefined();
    });
});
