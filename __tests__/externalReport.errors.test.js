/* eslint-env jasmine, jest */
let mockFailed = 'MOCK FAILED';
jest.unmock('../externalReport.js');
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);

import { ExternalReport } from '../externalReport.js';

describe('ExternalReport Errors', () => {
    let externalReport = null;
    beforeEach(() => {
        externalReport = new ExternalReport();
    });
    afterEach(() => {
        externalReport = null;
    });

    it('can fail list', async () => {
        expect.assertions(1);
        return await expect(externalReport.getExternalReports()).rejects.toEqual(mockFailed);
    });

    it('can fail single', async () => {
        expect.assertions(1);
        return await expect(externalReport.getExternalReport(1)).rejects.toEqual(mockFailed);
    });

    it('can fail external uri', async () => {
        expect.assertions(1);
        return await expect(externalReport.getExternalReportExternalUri(1)).rejects.toEqual(mockFailed);
    });

    it('can fail create', async () => {
        expect.assertions(1);
        return await expect(
            externalReport.createExternalReport({ name: 'test', url: '/asdf/asdf/asdf/adsf' })
        ).rejects.toEqual(mockFailed);
    });

    it('can fail update', async () => {
        expect.assertions(1);
        return await expect(
            externalReport.updateExternalReport({ id: 1, name: 'test', url: '/asdf/asdf/asdf/adsf' })
        ).rejects.toEqual(mockFailed);
    });

    it('can fail delete', async () => {
        expect.assertions(1);
        return await expect(externalReport.deleteExternalReport(1)).rejects.toEqual(mockFailed);
    });
});
