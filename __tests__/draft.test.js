/* eslint-env jasmine, jest */
jest.unmock('../pageBase.js');
jest.unmock('../draft.js');
import { DraftManager, Draft } from '../draft.js';

describe('Draft', () => {
    describe('draft manager', () => {
        let dm = null;
        beforeEach(() => {
            dm = new DraftManager();
        });
        it('can construct a new draft manager', () => {
            expect(dm).toBeDefined();
        });
        it('can create a new draft with no params', () => {
            return dm.createDraft('new/draft/path');
        });
        it('can create a new draft with params', () => {
            return dm.createDraft('new/draft/path', { redirect: 0, deleteRedirects: false });
        });
        describe('createDraft failures', () => {
            const failed = jest.fn();
            afterEach(() => {
                failed.mockReset();
            });
            it('invalid redirect', () => {
                return dm
                    .createDraft('new/draft/path', { redirect: 'no' })
                    .catch(failed)
                    .then(() => expect(failed).toHaveBeenCalled());
            });
            it('invalid deleteRedirects', () => {
                return dm
                    .createDraft('new/draft/path', { deleteRedirects: 'no' })
                    .catch(failed)
                    .then(() => expect(failed).toHaveBeenCalled());
            });
        });
        it('can get a Draft object by id', () => {
            expect(dm.getDraft(123)).toBeDefined();
        });
        it('can fetch the site drafts (no params)', () => {
            return dm.getDrafts();
        });
        it('can fetch the site drafts (all params)', () => {
            return dm.getDrafts({ parentId: 123, tags: ['foo', 'bar'], limit: 100, include: ['tags'] });
        });
        it('can fail if an invalid `tags` parameter is sent', () => {
            const success = jest.fn();
            return dm
                .getDrafts({ parentId: 123, tags: 'foo', limit: 100 })
                .then(() => {
                    success();
                    throw new Error('Promise was resolved');
                })
                .catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
        });
        it('can fail if an invalid `include` parameter is sent', () => {
            const success = jest.fn();
            return dm
                .getDrafts({ parentId: 123, include: 'tags', limit: 100 })
                .then(() => {
                    success();
                    throw new Error('Promise was resolved');
                })
                .catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
        });
        it('can fail if an invalid `limit` parameter is sent', () => {
            const success = jest.fn();
            return dm
                .getDrafts({ parentId: 123, limit: '100' })
                .then(() => {
                    success();
                    throw new Error('Promise was resolved');
                })
                .catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
        });
    });
    describe('constructor tests', () => {
        it('can construct a new Draft object using draft ID', () => {
            var draft = new Draft(123);
            expect(draft).toBeDefined();
        });
        it('can construct a new Draft object using draft path', () => {
            var draft = new Draft('foo/bar');
            expect(draft).toBeDefined();
        });
        it("can construct a new Draft object using 'home'", () => {
            var draft = new Draft('home');
            expect(draft).toBeDefined();
        });
        it("can construct a new Draft object defaulting to 'home'", () => {
            var draft = new Draft();
            expect(draft).toBeDefined();
        });
        it('can fail when the constructor is not used correctly', () => {
            expect(() => Draft()).toThrow();
        });
    });
    describe('do stuff tests', () => {
        let draft = null;
        beforeEach(() => {
            draft = new Draft(123);
        });
        afterEach(() => {
            draft = null;
        });
        it('can get the draft info', () => {
            return draft.getFullInfo();
        });
        it('can deactivate a draft', () => {
            return draft.deactivate();
        });
        it('can publish a draft', () => {
            return draft.publish();
        });
        it('can unpublish a draft', () => {
            return draft.unpublish();
        });
        it('can set the draft title', () => {
            return draft.setTitle('foo');
        });
        it('can fail if no title was sent to set (empty call)', () => {
            const success = jest.fn();
            return draft
                .setTitle()
                .then(() => {
                    success();
                    throw new Error('Success was called');
                })
                .catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
        });
        it('can fail if no title was sent to set (empty string)', () => {
            const success = jest.fn();
            return draft
                .setTitle('')
                .then(() => {
                    success();
                    throw new Error('Success was called');
                })
                .catch(() => {
                    expect(success).not.toHaveBeenCalled();
                });
        });
    });
});
