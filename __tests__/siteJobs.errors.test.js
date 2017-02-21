/* eslint-env jasmine, jest */
jest.unmock('mindtouch-http.js/plug.js');
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/plug.js'));
jest.unmock('mindtouch-http.js/progressPlug.js');
jest.mock('mindtouch-http.js/progressPlug.js', () => require.requireActual('../__mocks__/progressPlug.js'));

jest.unmock('../siteJobs.js');

describe('Error handling for the siteJobs.js module', () => {
    it('can fail if the response to getting the jobs statuses is an error', () => {
        jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
            get() {
                return Promise.reject({ message: 'Bad Request', status: 400, responseText: '{}' });
            }
        }));
        const SiteJobs = require('../siteJobs.js').SiteJobs;
        const sr = new SiteJobs();
        const success = jest.fn();
        return sr.getJobsStatuses().then(() => {
            success();
            throw new Error('Promise resolved');
        }).catch(() => {
            expect(success).not.toHaveBeenCalled();
        });
    });
});
