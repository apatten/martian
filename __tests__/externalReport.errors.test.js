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
        const success = jest.fn();
        return externalReport
            .getExternalReports()
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });

    it('can fail single', async () => {
        const success = jest.fn();
        return externalReport
            .getExternalReport(1)
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });

    it('can fail create', async () => {
        const success = jest.fn();
        return externalReport
            .createExternalReport({ name: 'test', url: '/asdf/asdf/asdf/adsf' })
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });

    it('can fail update', async () => {
        const success = jest.fn();
        return externalReport
            .updateExternalReport({ id: 1, name: 'test', url: '/asdf/asdf/asdf/adsf' })
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });

    it('can fail delete', async () => {
        const success = jest.fn();
        return externalReport
            .deleteExternalReport(1)
            .catch(success)
            .then(() => {
                expect(success).toHaveBeenCalled();
            });
    });
});
