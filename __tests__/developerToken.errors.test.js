/* eslint-env jasmine, jest */
import { developerTokensModel, developerTokenModel } from '../developerToken.js';
jest.unmock('../developerToken.js');

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);
const DT = require.requireActual('../developerToken.js');

describe('Developer Token Errors', () => {
    describe('manager', () => {
        it('can fail if the delete operation is rejected', async () => {
            const dt = new DT.DeveloperToken(11);
            expect.assertions(1);
            return await expect(dt.delete()).rejects.toBeDefined();
        });
    });
    describe('instance', () => {
        it('can fail if the add operation is rejected', async () => {
            const dtm = new DT.DeveloperTokenManager();
            expect.assertions(1);
            return await expect(dtm.addToken({ name: 'My New Token', host: 'www.example.com' })).rejects.toBeDefined();
        });
        it('can fail if the get operation is rejected', async () => {
            const dtm = new DT.DeveloperTokenManager();
            expect.assertions(1);
            return await expect(dtm.getTokens()).rejects.toEqual(undefined);
        });
    });
});
