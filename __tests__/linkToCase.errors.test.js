/* eslint-env jasmine, jest */
jest.unmock('../linkToCase.js');
import { LinkToCase } from '../linkToCase.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
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
            return await expect(ltc.getPageLinks()).rejects.toEqual(mockFailed);
        });
    });
});
