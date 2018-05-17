/* eslint-env jasmine, jest */
jest.unmock('../license.js');
import { License } from '../license.js';

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);

describe('License', () => {
    let license = null;
    beforeEach(() => {
        license = new License();
    });
    it('can fail fetching the usage', async () => {
        expect.assertions(1);
        return await expect(license.getUsage()).rejects.toEqual(mockFailed);
    });
    it('can fail fetching the usage logs', async () => {
        expect.assertions(1);
        return await expect(license.getUsageLogs()).rejects.toEqual(mockFailed);
    });
    it('can fail fetching the URL for a usage log', async () => {
        expect.assertions(1);
        return await expect(license.getUsageLogUrl('testURL')).rejects.toEqual(mockFailed);
    });
});
