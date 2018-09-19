import fetch from 'jest-fetch-mock';
import { DraftManager, Draft } from '../draft.js';
global.fetch = fetch;

describe('Draft', () => {
    const emptyPageResp = { tags: [] };
    afterEach(() => {
        fetch.resetMocks();
    });
    describe('DraftManager', () => {
        describe('Constructor', () => {
            it('can construct a new draft manager', () => {
                expect.assertions(1);
                const dm = new DraftManager();
                expect(dm).toBeDefined();
            });
        });
        describe('createDraft()', () => {
            let dm = null;
            beforeEach(() => {
                fetch.once('{}');
                dm = new DraftManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                dm = null;
            });
            it('can create a new draft with no params', async () => {
                expect.assertions(1);
                await expect(dm.createDraft('new/draft/path')).resolves.toEqual(emptyPageResp);
            });
            it('can create a new draft with params', async () => {
                expect.assertions(1);
                await expect(
                    dm.createDraft('new/draft/path', { redirect: 0, deleteRedirects: false })
                ).resolves.toEqual(emptyPageResp);
            });
        });
        describe('createDraft failures', () => {
            let dm = null;
            beforeEach(() => {
                dm = new DraftManager();
            });
            afterEach(() => {
                dm = null;
            });
            it('invalid redirect', async () => {
                expect.assertions(1);
                await expect(dm.createDraft('new/draft/path', { redirect: 'no' })).rejects.toEqual(
                    new Error('The redirect option must be a number.')
                );
            });
            it('invalid deleteRedirects', async () => {
                expect.assertions(1);
                await expect(dm.createDraft('new/draft/path', { deleteRedirects: 'no' })).rejects.toEqual(
                    new Error('The deleteredirects option must be a boolean.')
                );
            });
        });
        describe('get operations', () => {
            const emptyDraftsResp = { pages: [] };
            let dm = null;
            beforeEach(() => {
                fetch.once('{}');
                dm = new DraftManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                dm = null;
            });
            it('can get a Draft object by id', () => {
                expect.assertions(1);
                return expect(dm.getDraft(123)).toBeInstanceOf(Draft);
            });
            it('can fetch the site drafts (no params)', async () => {
                expect.assertions(1);
                await expect(dm.getDrafts()).resolves.toEqual(emptyDraftsResp);
            });
            it('can fetch the site drafts (all params)', async () => {
                expect.assertions(1);
                await expect(
                    dm.getDrafts({ parentId: 123, tags: ['foo', 'bar'], limit: 100, include: ['tags'] })
                ).resolves.toEqual(emptyDraftsResp);
            });
            it('can fail if an invalid `tags` parameter is sent', async () => {
                expect.assertions(1);
                await expect(dm.getDrafts({ parentId: 123, tags: 'foo', limit: 100 })).rejects.toEqual(
                    new Error('The `tags` parameter must be an array.')
                );
            });
            it('can fail if an invalid `include` parameter is sent', async () => {
                expect.assertions(1);
                await expect(dm.getDrafts({ parentId: 123, include: 'tags', limit: 100 })).rejects.toEqual(
                    new Error('The `include` parameter must be an array.')
                );
            });
            it('can fail if an invalid `limit` parameter is sent', async () => {
                expect.assertions(1);
                await expect(dm.getDrafts({ parentId: 123, limit: '100' })).rejects.toEqual(
                    new Error('The `limit` parameter must be an number.')
                );
            });
        });
        describe('Draft Manager errors', () => {
            let dm = null;
            beforeEach(() => {
                dm = new DraftManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                dm = null;
            });
            it('can fail to create draft when no parameters are supplied', () => {
                expect.assertions(1);
                expect(() => dm.createDraft()).toThrowError(
                    new Error('Unable to resolve the input ID to an API resource ID')
                );
            });
            it('can fail to create draft when an HTTP error is returned', async () => {
                expect.assertions(1);
                fetch.mockRejectOnce({ responseText: '{}' });
                await expect(dm.createDraft('foo/bar')).rejects.toEqual({ info: { arguments: [] } });
            });
            it('can fail to get drafts when an HTTP error is returned', async () => {
                const getDraftsError = new Error('failed getDrafts');
                expect.assertions(1);
                fetch.mockRejectOnce(getDraftsError);
                await expect(dm.getDrafts()).rejects.toEqual(getDraftsError);
            });
        });
    });
    describe('Draft', () => {
        describe('constructor tests', () => {
            it('can construct a new Draft object using draft ID', () => {
                const draft = new Draft(123);
                expect.assertions(1);
                expect(draft).toBeDefined();
            });
            it('can construct a new Draft object using draft path', () => {
                const draft = new Draft('foo/bar');
                expect.assertions(1);
                expect(draft).toBeDefined();
            });
            it("can construct a new Draft object using 'home'", () => {
                const draft = new Draft('home');
                expect.assertions(1);
                expect(draft).toBeDefined();
            });
            it("can construct a new Draft object defaulting to 'home'", () => {
                const draft = new Draft();
                expect.assertions(1);
                expect(draft).toBeDefined();
            });
        });
        describe('do stuff tests', () => {
            let draft = null;
            beforeEach(() => {
                fetch.once('{}');
                draft = new Draft(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                draft = null;
            });
            it('can get the draft info', async () => {
                expect.assertions(1);
                await expect(draft.getFullInfo()).resolves.toEqual(emptyPageResp);
            });
            it('can deactivate a draft', async () => {
                expect.assertions(1);
                await expect(draft.deactivate()).resolves.toEqual(emptyPageResp);
            });
            it('can publish a draft', async () => {
                expect.assertions(1);
                await expect(draft.publish()).resolves.toBeInstanceOf(global.Response);
            });
            it('can unpublish a draft', async () => {
                expect.assertions(1);
                await expect(draft.unpublish()).resolves.toEqual(emptyPageResp);
            });
            it('can set the draft title', async () => {
                expect.assertions(1);
                await expect(draft.setTitle('foo')).resolves.toEqual(emptyPageResp);
            });
            it('can fail if no title was sent to set (empty call)', async () => {
                expect.assertions(1);
                await expect(draft.setTitle()).rejects.toEqual(
                    new Error('A valid title must be supplied for the draft.')
                );
            });
            it('can fail if no title was sent to set (empty string)', async () => {
                expect.assertions(1);
                await expect(draft.setTitle('')).rejects.toEqual(
                    new Error('A valid title must be supplied for the draft.')
                );
            });
        });
        describe('Draft Errors', () => {
            const fetchError = new Error('failed');
            let draft = null;
            beforeEach(() => {
                fetch.mockRejectOnce(fetchError);
                draft = new Draft();
            });
            afterEach(() => {
                fetch.resetMocks();
                draft = null;
            });
            it('can fail to deactivate draft when an HTTP error is returned', async () => {
                expect.assertions(1);
                await expect(draft.deactivate()).rejects.toEqual(fetchError);
            });
            it('can fail to publish drafts when an HTTP error is returned', async () => {
                expect.assertions(1);
                await expect(draft.publish()).rejects.toEqual(fetchError);
            });
            it('can fail to unpublish drafts when an HTTP error is returned', async () => {
                expect.assertions(1);
                await expect(draft.unpublish()).rejects.toEqual(fetchError);
            });
            it('can fail to set draft title when an HTTP error is returned', async () => {
                expect.assertions(1);
                await expect(draft.setTitle(123)).rejects.toEqual(fetchError);
            });
        });
    });
});
