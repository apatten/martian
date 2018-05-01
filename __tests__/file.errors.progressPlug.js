/* eslint-env jasmine, jest */
jest.unmock('../file.js');
import { File } from '../file.js';

jest.mock('/mindtouch-http.js/progressPlug.js', () =>
    require.requireActual('../__mocks__/customProgressPlug.js')({
        put: () => Promise.reject()
    })
);

describe('File API', () => {
    let file = null;
    beforeEach(() => {
        file = new File(123);
    });
    it('can fail adding a file revision with no progress', async () => {
        expect.assertions(1);
        return await expect(file.addRevision('fileObj', { progress: () => {} })).rejects.toEqual(undefined);
    });
});
