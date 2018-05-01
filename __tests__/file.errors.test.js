/* eslint-env jasmine, jest */
jest.unmock('../file.js');
import { File } from '../file.js';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);

describe('File API', () => {
    let file = null;
    beforeEach(() => {
        file = new File(123);
    });
    it('can fail fetching file info', async () => {
        expect.assertions(1);
        return await expect(file.getInfo()).rejects.toEqual(undefined);
    });
    it('can fail fetching file revisions', async () => {
        expect.assertions(1);
        return await expect(file.getRevisions()).rejects.toEqual(undefined);
    });
    it('can fail setting the file description', async () => {
        expect.assertions(1);
        return await expect(file.setDescription()).rejects.toEqual(undefined);
    });
    it('can fail deleting a file', async () => {
        expect.assertions(1);
        return await expect(file.delete()).rejects.toEqual(undefined);
    });
    it('can fail adding a file revision', async () => {
        expect.assertions(1);
        return await expect(file.addRevision('fileObj')).rejects.toEqual(undefined);
    });
    it('can fail moving a file', async () => {
        expect.assertions(1);
        return await expect(file.move({ to: 'foo/bar', name: 'image.jpg' })).rejects.toBeDefined();
    });
});
