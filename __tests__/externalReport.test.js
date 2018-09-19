import fetch from 'jest-fetch-mock';
import { ExternalReport } from '../externalReport.js';
global.fetch = fetch;

describe('ExternalReport', () => {
    describe('operations', () => {
        let externalReport = null;
        beforeEach(() => {
            externalReport = new ExternalReport();
            fetch.once('{}');
        });
        afterEach(() => {
            externalReport = null;
            fetch.resetMocks();
        });
        it('can construct a new ExternalReport', () => {
            const er = new ExternalReport();
            expect.assertions(1);
            expect(er).toBeDefined();
        });
        it('can get external reports', async () => {
            expect.assertions(1);
            await expect(externalReport.getExternalReports()).resolves.toEqual({ 'external-reports': [] });
        });
        describe('update external report', () => {
            it('can update', async () => {
                expect.assertions(1);
                await expect(
                    externalReport.updateExternalReport({ id: 1, name: 'testing', url: 'asdfaf/asdfas/asdf/asdf/asdf' })
                ).resolves.toEqual({});
            });
            it('can fail with null value ', async () => {
                expect.assertions(1);
                await expect(externalReport.updateExternalReport(null)).rejects.toEqual(
                    new Error('Unable to create an external report without data.')
                );
            });
            it('must have a proper name and id', async () => {
                expect.assertions(1);
                await expect(externalReport.updateExternalReport({ name: null, url: 0 })).rejects.toEqual(
                    new Error('0 is not a string,null is not a string')
                );
            });
        });
        describe('get external report', () => {
            it('can get', async () => {
                expect.assertions(1);
                await expect(externalReport.getExternalReport(1)).resolves.toEqual({});
            });
            it('can fail with null value ', async () => {
                expect.assertions(1);
                await expect(externalReport.getExternalReport(null)).rejects.toEqual(
                    new Error('Must submit a numeric id of an external report.')
                );
            });
            it('can fail with string value', async () => {
                expect.assertions(1);
                await expect(externalReport.getExternalReport('1')).rejects.toEqual(
                    new Error('Must submit a numeric id of an external report.')
                );
            });
        });
        describe('get external report external uri', () => {
            it('can get external report external uri', async () => {
                expect.assertions(1);
                await expect(externalReport.getExternalReportExternalUri(1)).resolves.toEqual({});
            });
            it('can fail with null value ', async () => {
                expect.assertions(1);
                await expect(externalReport.getExternalReportExternalUri(null)).rejects.toEqual(
                    new Error('Must submit a numeric id of an external report.')
                );
            });
            it('can fail with string value', async () => {
                expect.assertions(1);
                await expect(externalReport.getExternalReportExternalUri('1')).rejects.toEqual(
                    new Error('Must submit a numeric id of an external report.')
                );
            });
        });
        describe('delete external report', () => {
            it('can delete external report', async () => {
                expect.assertions(1);
                await expect(externalReport.deleteExternalReport(1)).resolves.toEqual({});
            });
            it('can fail with null value ', async () => {
                expect.assertions(1);
                await expect(externalReport.deleteExternalReport(null)).rejects.toEqual(
                    new Error('Must submit a numeric id of an external report.')
                );
            });
            it('can fail with string value', async () => {
                expect.assertions(1);
                await expect(externalReport.deleteExternalReport('1')).rejects.toEqual(
                    new Error('Must submit a numeric id of an external report.')
                );
            });
        });
        describe('create external report', () => {
            it('can create', async () => {
                expect.assertions(1);
                await expect(
                    externalReport.createExternalReport({ name: 'testing', url: 'asdfaf/asdfas/asdf/asdf/asdf' })
                ).resolves.toEqual({});
            });
            it('cannot send a null object', async () => {
                expect.assertions(1);
                await expect(externalReport.createExternalReport(null)).rejects.toEqual(
                    new Error('Unable to create an external report without data.')
                );
            });
            it('must have a proper name and id', async () => {
                expect.assertions(1);
                await expect(externalReport.createExternalReport({ name: null, url: 0 })).rejects.toEqual(
                    new Error('0 is not a string,null is not a string')
                );
            });
        });
    });
    describe('Errors', () => {
        const mockFailed = new Error('external report failure');
        let externalReport = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            externalReport = new ExternalReport();
        });
        afterEach(() => {
            fetch.resetMocks();
            externalReport = null;
        });
        it('can fail list', async () => {
            expect.assertions(1);
            await expect(externalReport.getExternalReports()).rejects.toEqual(mockFailed);
        });
        it('can fail single', async () => {
            expect.assertions(1);
            await expect(externalReport.getExternalReport(1)).rejects.toEqual(mockFailed);
        });
        it('can fail external uri', async () => {
            expect.assertions(1);
            await expect(externalReport.getExternalReportExternalUri(1)).rejects.toEqual(mockFailed);
        });
        it('can fail create', async () => {
            expect.assertions(1);
            await expect(
                externalReport.createExternalReport({ name: 'test', url: '/asdf/asdf/asdf/adsf' })
            ).rejects.toEqual(mockFailed);
        });
        it('can fail update', async () => {
            expect.assertions(1);
            await expect(
                externalReport.updateExternalReport({ id: 1, name: 'test', url: '/asdf/asdf/asdf/adsf' })
            ).rejects.toEqual(mockFailed);
        });
        it('can fail delete', async () => {
            expect.assertions(1);
            await expect(externalReport.deleteExternalReport(1)).rejects.toEqual(mockFailed);
        });
    });
});
