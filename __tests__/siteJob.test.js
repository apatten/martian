import fetch from 'jest-fetch-mock';
import { SiteJobManager, SiteJob } from '../siteJob.js';
global.fetch = fetch;

describe('Site Jobs API', () => {
    describe('SiteJobManager', () => {
        describe('constructor', () => {
            it('can create a new SiteJobs object', () => {
                expect.assertions(1);
                const sj = new SiteJobManager();
                expect(sj).toBeDefined();
            });
        });
        describe('operations', () => {
            let sj = null;
            beforeEach(() => {
                fetch.once('{}');
                sj = new SiteJobManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                sj = null;
            });
            it('can get the jobs status', async () => {
                expect.assertions(1);
                await expect(sj.getJobsStatuses()).resolves.toEqual({ jobs: [] });
            });
            it('can schedule an export job (all params)', async () => {
                expect.assertions(1);
                await expect(
                    sj.scheduleExport({
                        email: 'foo@bar.com',
                        url: 'http://www.example.com',
                        pages: [
                            { path: 'path/to/page/1', id: 1, includeSubpages: true },
                            { path: 'path/to/page/2', id: 2, includeSubpages: false }
                        ]
                    })
                ).resolves.toEqual({});
            });
            it('can schedule an export job (page path only)', async () => {
                expect.assertions(1);
                await expect(
                    sj.scheduleExport({
                        url: 'http://www.example.com',
                        pages: [{ path: 'path/to/page/1' }]
                    })
                ).resolves.toEqual({});
            });
            it('can schedule an export job (page ID only)', async () => {
                expect.assertions(1);
                await expect(
                    sj.scheduleExport({
                        email: 'foo@bar.com',
                        pages: [{ id: 1 }]
                    })
                ).resolves.toEqual({});
            });
            it('can fail when scheduling an export with missing options', async () => {
                expect.assertions(1);
                await expect(sj.scheduleExport()).rejects.toEqual(new Error('The export options must be supplied'));
            });
            it('can fail when scheduling an export with missing notification options', async () => {
                expect.assertions(1);
                await expect(sj.scheduleExport({})).rejects.toEqual(
                    new Error(
                        'Notification email and url are missing. Need an email or url to notify when the job completes.'
                    )
                );
            });
            it('can fail when scheduling an export with missing pages option', async () => {
                expect.assertions(1);
                await expect(sj.scheduleExport({ email: 'foo@bar.com' })).rejects.toEqual(
                    'One or more pages must be specified for export.'
                );
            });
            it('can fail when scheduling an export with a non-array pages option', async () => {
                expect.assertions(1);
                await expect(
                    sj.scheduleExport({ email: 'foo@bar.com', pages: 'this is clearly a string' })
                ).rejects.toEqual('The pages option must be an array.');
            });
            it('can schedule an import job (all params)', async () => {
                expect.assertions(1);
                await expect(
                    sj.scheduleImport({
                        email: 'foo@bar.com',
                        url: 'http://www.example.com',
                        archiveUrl: 'http://www.example.org',
                        dryRun: true
                    })
                ).resolves.toEqual({});
            });
            it('can schedule an import job (email only)', async () => {
                expect.assertions(1);
                await expect(
                    sj.scheduleImport({
                        email: 'foo@bar.com',
                        archiveUrl: 'http://www.example.org'
                    })
                ).resolves.toEqual({});
            });
            it('can schedule an import job (url only)', async () => {
                expect.assertions(1);
                await expect(
                    sj.scheduleImport({
                        url: 'http://bar.com',
                        archiveUrl: 'http://www.example.org'
                    })
                ).resolves.toEqual({});
            });
            it('can fail when scheduling an import with missing options', async () => {
                expect.assertions(1);
                await expect(sj.scheduleImport()).rejects.toEqual(new Error('The import options must be supplied'));
            });
            it('can fail when scheduling an import with missing email and url', async () => {
                expect.assertions(1);
                await expect(sj.scheduleImport({ archiveUrl: 'https://example.com' })).rejects.toEqual(
                    new Error(
                        'Notification email and url are missing. Need an email or url to notify when the job completes.'
                    )
                );
            });
            it('can fail when scheduling an import with missing archiveUrl option', async () => {
                expect.assertions(1);
                await expect(sj.scheduleImport({ email: 'foo@bar.com' })).rejects.toEqual(
                    new Error('An archive url is required, and must be a non-empty string to perform an import.')
                );
            });
            it('can fail when scheduling an import with invalid archiveUrl option', async () => {
                expect.assertions(1);
                await expect(sj.scheduleImport({ email: 'foo@bar.com', archiveUrl: '' })).rejects.toEqual(
                    new Error('An archive url is required, and must be a non-empty string to perform an import.')
                );
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('siteJobManager API failure');
            const exportParams = {
                email: 'foo@bar.com',
                url: 'http://www.example.com',
                pages: [
                    { path: 'path/to/page/1', id: 1, includeSubpages: true },
                    { path: 'path/to/page/2', id: 2, includeSubpages: false }
                ]
            };

            const importParams = {
                email: 'foo@bar.com',
                url: 'http://www.example.com',
                archiveUrl: 'http://www.example.org',
                dryRun: true
            };
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
            });
            afterEach(() => {
                fetch.resetMocks();
            });
            it('can fail if the response to getting the jobs statuses is an error', async () => {
                const sjm = new SiteJobManager();
                expect.assertions(1);
                await expect(sjm.getJobsStatuses()).rejects.toEqual({ message: 'siteJobManager API failure' });
            });
            it('can fail scheduling a site export', async () => {
                const sjm = new SiteJobManager();
                expect.assertions(1);
                await expect(sjm.scheduleExport(exportParams)).rejects.toEqual(mockFailed);
            });
            it('can fail scheduling a site import', async () => {
                const sjm = new SiteJobManager();
                expect.assertions(1);
                await expect(sjm.scheduleImport(importParams)).rejects.toEqual(mockFailed);
            });
        });
    });
    describe('SiteJob', () => {
        describe('constructor', () => {
            it('can construct a SiteJob', () => {
                const sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
                expect(sj).toBeDefined();
            });
            it('can fail construction if the Job ID is invalid', () => {
                expect(() => new SiteJob()).toThrow();
                expect(() => new SiteJob(123456)).toThrow();
            });
        });
        describe('operations', () => {
            let sj;
            beforeEach(() => {
                fetch.once('{}');
                sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
            });
            afterEach(() => {
                fetch.resetMocks();
                sj = null;
            });
            it('can get the status of a site job', async () => {
                expect.assertions(1);
                await expect(sj.getStatus()).resolves.toEqual({});
            });
            it('can cancel a job', async () => {
                expect.assertions(1);
                await expect(sj.cancel()).resolves.toEqual({});
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('siteJob API failure');
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
            });
            afterEach(() => {
                fetch.resetMocks();
            });
            it('can fail if the response to getting a job status is an error', async () => {
                const sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
                expect.assertions(1);
                await expect(sj.getStatus()).rejects.toBeDefined();
            });
            it('can fail if the response to cancelling a job is an error', async () => {
                const sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
                expect.assertions(1);
                await expect(sj.cancel()).rejects.toBeDefined();
            });
        });
    });
});
