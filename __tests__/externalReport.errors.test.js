/* eslint-env jasmine, jest */
jest.unmock('../externalReport.js');
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
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
        return await expect(externalReport.getExternalReports()).rejects.toBeDefined();
    });

    it('can fail single', async () => {
        expect.assertions(1);
        return await expect(externalReport.getExternalReport(1)).rejects.toBeDefined();
    });

    it('can fail create', async () => {
        expect.assertions(1);
        return await expect(
            externalReport.createExternalReport({ name: 'test', url: '/asdf/asdf/asdf/adsf' })
        ).rejects.toBeDefined();
    });

    it('can fail update', async () => {
        expect.assertions(1);
        return await expect(
            externalReport.updateExternalReport({ id: 1, name: 'test', url: '/asdf/asdf/asdf/adsf' })
        ).rejects.toBeDefined();
    });

    it('can fail delete', async () => {
        expect.assertions(1);
        return await expect(externalReport.deleteExternalReport(1)).rejects.toBeDefined();
    });
});
