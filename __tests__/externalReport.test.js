/* eslint-env jasmine, jest */
jest.unmock('../externalReport.js');
import { ExternalReport } from '../externalReport.js';

describe('ExternalReport', () => {
    let externalReport = null;
    beforeEach(() => {
        externalReport = new ExternalReport();
    });
    afterEach(() => {
        externalReport = null;
    });
    it('can construct a new ExternalReport', () => {
        const er = new ExternalReport();
        expect(er).toBeDefined();
    });
    it('can get external reports', () => {
        return externalReport.getExternalReports();
    });
    describe('update external report', () => {
        it('can update', () => {
            return externalReport.updateExternalReport({ id: 1, name: 'testing', url: 'asdfaf/asdfas/asdf/asdf/asdf' });
        });
        it('can fail with null value ', async () => {
            expect.assertions(1);
            return await expect(externalReport.updateExternalReport(null)).rejects.toEqual(
                new Error('Unable to create an external report without data.')
            );
        });
        it('must have a proper name and id', async () => {
            expect.assertions(1);
            return await expect(externalReport.updateExternalReport({ name: null, url: 0 })).rejects.toEqual(
                new Error('0 is not a string,null is not a string')
            );
        });
    });
    describe('get external report', () => {
        it('can get', () => {
            return externalReport.getExternalReport(1);
        });
        it('can fail with null value ', async () => {
            expect.assertions(1);
            return await expect(externalReport.getExternalReport(null)).rejects.toEqual(
                new Error('Must submit a numeric id of an external report.')
            );
        });
        it('can fail with string value', async () => {
            expect.assertions(1);
            return await expect(externalReport.getExternalReport('1')).rejects.toEqual(
                new Error('Must submit a numeric id of an external report.')
            );
        });
    });
    describe('get external report external uri', () => {
        it('can get external report external uri', () => {
            return externalReport.getExternalReportExternalUri(1);
        });
        it('can fail with null value ', async () => {
            expect.assertions(1);
            return await expect(externalReport.getExternalReportExternalUri(null)).rejects.toEqual(
                new Error('Must submit a numeric id of an external report.')
            );
        });
        it('can fail with string value', async () => {
            expect.assertions(1);
            return await expect(externalReport.getExternalReportExternalUri('1')).rejects.toEqual(
                new Error('Must submit a numeric id of an external report.')
            );
        });
    });

    describe('delete external report', () => {
        it('can delete external report', () => {
            return externalReport.deleteExternalReport(1);
        });
        it('can fail with null value ', async () => {
            expect.assertions(1);
            return await expect(externalReport.deleteExternalReport(null)).rejects.toEqual(
                new Error('Must submit a numeric id of an external report.')
            );
        });
        it('can fail with string value', async () => {
            expect.assertions(1);
            return await expect(externalReport.deleteExternalReport('1')).rejects.toEqual(
                new Error('Must submit a numeric id of an external report.')
            );
        });
    });
    describe('create external report', () => {
        it('can create', () => {
            return externalReport.createExternalReport({ name: 'testing', url: 'asdfaf/asdfas/asdf/asdf/asdf' });
        });
        it('cannot send a null object', async () => {
            expect.assertions(1);
            return await expect(externalReport.createExternalReport(null)).rejects.toEqual(
                new Error('Unable to create an external report without data.')
            );
        });
        it('must have a proper name and id', async () => {
            expect.assertions(1);
            return await expect(externalReport.createExternalReport({ name: null, url: 0 })).rejects.toEqual(
                new Error('0 is not a string,null is not a string')
            );
        });
    });
});
