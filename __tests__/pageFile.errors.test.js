/* eslint-env jasmine, jest */
jest.unmock('../pageFileBase.js');
jest.unmock('../pageFile.js');
import { PageFile } from '../pageFile.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed),
        delete: () => Promise.reject(mockFailed)
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
            return await expect(pf.getInfo()).rejects.toEqual(mockFailed);
        });
        it('can fail deleting a file attachment from the page', async () => {
            return await expect(pf.delete()).rejects.toEqual(mockFailed);
        });
        it('can fail getting the description of a file attachment', async () => {
            return await expect(pf.getDescription()).rejects.toEqual(mockFailed);
        });
        it('can fail clearing the description of a file attachment', async () => {
            return await expect(pf.clearDescription()).rejects.toEqual(mockFailed);
        });
        it('can fail updating the description of a file attachment', async () => {
            return await expect(pf.updateDescription()).rejects.toEqual(mockFailed);
        });
    });
});
