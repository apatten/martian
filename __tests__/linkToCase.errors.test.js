/* eslint-env jasmine, jest */
jest.unmock('../linkToCase.js');
import { LinkToCase } from '../linkToCase.js';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);

describe('LinkToCase API', () => {
    describe('instance', () => {
        let ltc = null;
        beforeEach(() => {
            ltc = new LinkToCase('abcd12341');
        });
        it('can fail getting a blank list of linked pages', async () => {
            expect.assertions(1);
            return await expect(ltc.getPageLinks()).rejects.toEqual(undefined);
        });
    });
});
