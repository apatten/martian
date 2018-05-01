/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);
jest.unmock('../workflows.js');
import { WorkflowManager } from '../workflows.js';

describe('Workflows', () => {
    describe('submit feedback', () => {
        let wm = null;
        beforeEach(() => {
            wm = new WorkflowManager();
        });
        it('can fail submitting page feedback', async () => {
            expect.assertions(1);
            return await expect(wm.submitFeedback({ _path: 'foo' })).rejects.toEqual(undefined);
        });
        it('can fail requesting an article be created on the site', async () => {
            expect.assertions(1);
            return await expect(wm.requestArticle()).rejects.toEqual(undefined);
        });
        it('can fail submitting a support issue', async () => {
            expect.assertions(1);
            return await expect(wm.submitIssue({ _path: 'foo', _search: 'bar' })).rejects.toEqual(undefined);
        });
        it('can fail contacting site suppport', async () => {
            expect.assertions(1);
            return await expect(wm.contactSupport({ _path: 'foo', _search: 'bar' })).rejects.toEqual(undefined);
        });
    });
});
