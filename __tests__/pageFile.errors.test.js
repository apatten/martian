/* eslint-env jasmine, jest */
jest.unmock('../pageFileBase.js');
jest.unmock('../pageFile.js');
import { PageFile } from '../pageFile.js';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject(),
        delete: () => Promise.reject()
    })
);

describe('Page files', () => {
    describe('operations', () => {
        let pf = null;
        beforeEach(() => {
            pf = new PageFile(123, 'file.pdf');
        });
        afterEach(() => {
            pf = null;
        });
        it('can fail getting the file info', async () => {
            return await expect(pf.getInfo()).rejects.toEqual(undefined);
        });
        it('can fail deleting a file attachment from the page', async () => {
            return await expect(pf.delete()).rejects.toEqual(undefined);
        });
        it('can fail getting the description of a file attachment', async () => {
            return await expect(pf.getDescription()).rejects.toEqual(undefined);
        });
        it('can fail clearing the description of a file attachment', async () => {
            return await expect(pf.clearDescription()).rejects.toEqual(undefined);
        });
        it('can fail updating the description of a file attachment', async () => {
            return await expect(pf.updateDescription()).rejects.toEqual(undefined);
        });
    });
});
