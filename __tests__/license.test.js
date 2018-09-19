import fetch from 'jest-fetch-mock';
import { License } from '../license.js';
global.fetch = fetch;

describe('License', () => {
    let license = null;
    beforeEach(() => {
        license = new License();
    });
    afterEach(() => {
        license = null;
    });
    describe('operations', () => {
        const emptyUsageResponse = { totals: [] };
        const emptyLogsResponse = { logs: [] };
        beforeEach(() => {
            fetch.once('{}');
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can fetch the usage (no parameters)', async () => {
            expect.assertions(1);
            await expect(license.getUsage()).resolves.toEqual(emptyUsageResponse);
        });
        it('can fetch the usage (all parameters)', async () => {
            expect.assertions(1);
            await expect(
                license.getUsage({
                    since: new Date(2015, 12, 31, 12, 12, 0),
                    upTo: new Date(Date.now()),
                    version: 2
                })
            ).resolves.toEqual(emptyUsageResponse);
        });
        it('can fail if an invalid `since` value is sent', async () => {
            expect.assertions(1);
            await expect(license.getUsage({ since: '20151231121200' })).rejects.toEqual(
                new Error('The `since` parameter must be of type Date.')
            );
        });
        it('can fail if an invalid `upTo` value is sent', async () => {
            expect.assertions(1);
            await expect(license.getUsage({ upTo: 20151231121200 })).rejects.toEqual(
                new Error('The `upTo` parameter must be of type Date.')
            );
        });
        it('can fetch the usage logs', async () => {
            expect.assertions(1);
            await expect(license.getUsageLogs()).resolves.toEqual(emptyLogsResponse);
        });
        it('can fetch the URL for a usage log', async () => {
            expect.assertions(1);
            await expect(license.getUsageLogUrl('foo')).resolves.toEqual({});
        });
        it('can fail if no name is supplied to fetch a log URL.', async () => {
            expect.assertions(1);
            await expect(license.getUsageLogUrl()).rejects.toEqual(new Error('The log name must be supplied.'));
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('license API failure');
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
        });
        afterEach(() => {
            fetch.resetMocks();
        });
        it('can fail fetching the usage', async () => {
            expect.assertions(1);
            await expect(license.getUsage()).rejects.toEqual(mockFailed);
        });
        it('can fail fetching the usage logs', async () => {
            expect.assertions(1);
            await expect(license.getUsageLogs()).rejects.toEqual(mockFailed);
        });
        it('can fail fetching the URL for a usage log', async () => {
            expect.assertions(1);
            await expect(license.getUsageLogUrl('testURL')).rejects.toEqual(mockFailed);
        });
    });
});
