import fetch from 'jest-fetch-mock';
import { WorkflowManager } from '../workflows.js';
global.fetch = fetch;

describe('Workflows', () => {
    describe('operations', () => {
        let wm = null;
        beforeEach(() => {
            fetch.once('{}');
            wm = new WorkflowManager();
        });
        afterEach(() => {
            fetch.resetMocks();
            wm = null;
        });
        it('can submit page feedback', async () => {
            expect.assertions(1);
            await expect(wm.submitFeedback({ _path: 'foo' })).resolves.toEqual({});
        });
        it('can fail if the page feedback path is not supplied', async () => {
            expect.assertions(1);
            await expect(wm.submitFeedback({})).rejects.toEqual(
                new Error('The _path field must be supplied for submit-feedback')
            );
        });
        it('can fail if no options are supplied to submitFeedback', async () => {
            expect.assertions(1);
            await expect(wm.submitFeedback()).rejects.toEqual(
                new Error('The _path field must be supplied for submit-feedback')
            );
        });
        it('can send a request article message', async () => {
            expect.assertions(1);
            await expect(wm.requestArticle({})).resolves.toEqual({});
        });
        it('can send a request article message with no parameters', async () => {
            expect.assertions(1);
            await expect(wm.requestArticle()).resolves.toEqual({});
        });
        it('can send a submit issue message', async () => {
            expect.assertions(1);
            await expect(wm.submitIssue({ _path: 'foo', _search: 'bar' })).resolves.toEqual({});
        });
        it('can fail if the submit issue path is not supplied', async () => {
            expect.assertions(1);
            await expect(wm.submitIssue({ _search: 'bar' })).rejects.toEqual(
                new Error('The _path and _search fields must be supplied for submit-issue')
            );
        });
        it('can fail if the submit issue search is not supplied', async () => {
            expect.assertions(1);
            await expect(wm.submitIssue({ _path: 'foo' })).rejects.toEqual(
                new Error('The _path and _search fields must be supplied for submit-issue')
            );
        });
        it('can fail if no options are supplied to submitIssue', async () => {
            expect.assertions(1);
            await expect(wm.submitIssue()).rejects.toEqual(
                new Error('The _path and _search fields must be supplied for submit-issue')
            );
        });
        it('can send a contact support message', async () => {
            expect.assertions(1);
            await expect(wm.contactSupport({ _path: 'foo', _search: 'bar' })).resolves.toEqual({});
        });
        it('can fail if the contact support path is not supplied', async () => {
            expect.assertions(1);
            await expect(wm.contactSupport({ _search: 'bar' })).rejects.toEqual(
                new Error('The _path and _search fields must be supplied for contact-support')
            );
        });
        it('can fail if the contact support search is not supplied', async () => {
            expect.assertions(1);
            await expect(wm.contactSupport({ _path: 'foo' })).rejects.toEqual(
                new Error('The _path and _search fields must be supplied for contact-support')
            );
        });
        it('can fail if no options are supplied to contactSupport', async () => {
            expect.assertions(1);
            await expect(wm.contactSupport()).rejects.toEqual(
                new Error('The _path and _search fields must be supplied for contact-support')
            );
        });
    });

    describe('failures', () => {
        const mockFailed = new Error('workflows API failure');
        let wm = null;
        beforeEach(() => {
            fetch.mockReject(mockFailed);
            wm = new WorkflowManager();
        });
        afterEach(() => {
            fetch.resetMocks();
            wm = null;
        });
        it('can fail submitting page feedback', async () => {
            expect.assertions(1);
            await expect(wm.submitFeedback({ _path: 'foo' })).rejects.toEqual(mockFailed);
        });
        it('can fail requesting an article be created on the site', async () => {
            expect.assertions(1);
            await expect(wm.requestArticle()).rejects.toEqual(mockFailed);
        });
        it('can fail submitting a support issue', async () => {
            expect.assertions(1);
            await expect(wm.submitIssue({ _path: 'foo', _search: 'bar' })).rejects.toEqual(mockFailed);
        });
        it('can fail contacting site support', async () => {
            expect.assertions(1);
            await expect(wm.contactSupport({ _path: 'foo', _search: 'bar' })).rejects.toEqual(mockFailed);
        });
    });
});
