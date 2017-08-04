/* eslint-env jasmine, jest */
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
    get: () => Promise.reject(),
    post: () => Promise.reject(),
    put: () => Promise.reject()
}));
jest.unmock('../siteJob.js');
const SiteJobManager = require.requireActual('../siteJob.js').SiteJobManager;
const SiteJob = require.requireActual('../siteJob.js').SiteJob;

describe('Error handling for the siteJobs.js module', () => {
    const failed = jest.fn();
    afterEach(() => {
        failed.mockReset();
    });
    it('can fail if the response to getting the jobs statuses is an error', () => {
        const sjm = new SiteJobManager();
        return sjm.getJobsStatuses().catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
    it('can fail if the response to getting a job status is an error', () => {
        const sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
        return sj.getStatus().catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
    it('can fail if the response to cancelling a job is an error', () => {
        const sj = new SiteJob('3c07ca9c-49c0-4097-8eea-8e29e96461ec');
        return sj.cancel().catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
});
