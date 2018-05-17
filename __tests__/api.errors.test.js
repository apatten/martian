/* eslint-env jasmine, jest */
jest.unmock('../api.js');
import { Api } from '../api.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);

describe('API Module', () => {
    let api = null;
    beforeEach(() => {
        api = new Api();
    });
    it('can fail an HTTP request', async () => {
        expect.assertions(1);
        return await expect(api.http()).rejects.toEqual(mockFailed);
    });
    it('can fail an F1 request', async () => {
        expect.assertions(1);
        return await expect(api.f1()).rejects.toEqual(mockFailed);
    });
});
