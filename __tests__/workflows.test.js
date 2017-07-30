/* eslint-env jasmine, jest */
jest.unmock('../workflows.js');
import { WorkflowManager } from '../workflows.js';

describe('Workflows', () => {
    describe('operations', () => {
        describe('submit feedback', () => {
            let wm = null;
            beforeEach(() => {
                wm = new WorkflowManager();
            });
            afterEach(() => {
                wm = null;
            });
            it('can submit page feedback', () => {
                return wm.submitFeedback({ _path: 'foo' });
            });
            it('can fail if the page feedback path is not supplied', () => {
                const success = jest.fn();
                return wm.submitFeedback({}).then(() => {
                    success();
                    throw new Error('The call did not throw.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail if no options are supplied to submitFeedback', () => {
                const success = jest.fn();
                return wm.submitFeedback().then(() => {
                    success();
                    throw new Error('The call did not throw.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can send a request article message', () => {
                return wm.requestArticle({});
            });
            it('can send a request article message with no parameters', () => {
                return wm.requestArticle();
            });
            it('can send a submit issue message', () => {
                return wm.submitIssue({ _path: 'foo', _search: 'bar' });
            });
            it('can fail if the submit issue path is not supplied', () => {
                const success = jest.fn();
                return wm.submitIssue({ _search: 'bar' }).then(() => {
                    success();
                    throw new Error('The call did not throw.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail if the submit issue search is not supplied', () => {
                const success = jest.fn();
                return wm.submitIssue({ _path: 'foo' }).then(() => {
                    success();
                    throw new Error('The call did not throw.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail if no options are supplied to submitIssue', () => {
                const success = jest.fn();
                return wm.submitIssue().then(() => {
                    success();
                    throw new Error('The call did not throw.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can send a contact support message', () => {
                return wm.contactSupport({ _path: 'foo', _search: 'bar' });
            });
            it('can fail if the contact support path is not supplied', () => {
                const success = jest.fn();
                return wm.contactSupport({ _search: 'bar' }).then(() => {
                    success();
                    throw new Error('The call did not throw.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail if the contact support search is not supplied', () => {
                const success = jest.fn();
                return wm.contactSupport({ _path: 'foo' }).then(() => {
                    success();
                    throw new Error('The call did not throw.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
            it('can fail if no options are supplied to contactSupport', () => {
                const success = jest.fn();
                return wm.contactSupport().then(() => {
                    success();
                    throw new Error('The call did not throw.');
                }).catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
            });
        });
    });
});
