/* eslint-env jasmine, jest */

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);
jest.unmock('../siteJob.js');
const SiteJobManager = require.requireActual('../siteJob.js').SiteJobManager;
const SiteJob = require.requireActual('../siteJob.js').SiteJob;

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

describe('Error handling for the siteJobs.js module', () => {
    it('can fail if the response to getting the jobs statuses is an error', async () => {
        const sjm = new SiteJobManager();
        expect.assertions(1);
        return await expect(sjm.getJobsStatuses()).rejects.toBeDefined();
    });
    it('can fail scheduling a site export', async () => {
        const sjm = new SiteJobManager();
        expect.assertions(1);
        return await expect(sjm.scheduleExport(exportParams)).rejects.toEqual(mockFailed);
    });
    it('can fail scheduling a site import', async () => {
        const sjm = new SiteJobManager();
        expect.assertions(1);
        return await expect(sjm.scheduleImport(importParams)).rejects.toEqual(mockFailed);
    });
    it('can fail if the response to getting a job status is an error', async () => {
        const sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
        expect.assertions(1);
        return await expect(sj.getStatus()).rejects.toBeDefined();
    });
    it('can fail if the response to cancelling a job is an error', async () => {
        const sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
        expect.assertions(1);
        return await expect(sj.cancel()).rejects.toBeDefined();
    });
});
