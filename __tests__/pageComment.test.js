import fetch from 'jest-fetch-mock';
import { PageCommentManager, PageComment } from '../pageComment.js';
global.fetch = fetch;

describe('Page Comment API', () => {
    describe('PageCommentManager', () => {
        describe('construction', () => {
            it('can create a new PageCommentManager', () => {
                const pcm = new PageCommentManager(123);
                expect.assertions(1);
                expect(pcm).toBeDefined();
            });
        });
        describe('operations', () => {
            let pcm = null;
            beforeEach(() => {
                fetch.once('{}');
                pcm = new PageCommentManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                pcm = null;
            });
            it('can create a new page comment', async () => {
                expect.assertions(1);
                await expect(pcm.addComment('foo')).resolves.toEqual({});
            });
            it('can fail if no comment is supplied when creating a new comment', async () => {
                expect.assertions(1);
                await expect(pcm.addComment()).rejects.toEqual(
                    new Error('The comment text must be supplied, and must not be empty.')
                );
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('pageCommentManager API failure');
            let page = null;
            beforeEach(() => {
                fetch.mockReject(mockFailed);
                page = new PageCommentManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can fail adding page comment', async () => {
                expect.assertions(1);
                await expect(page.addComment('commentText')).rejects.toEqual(mockFailed);
            });
        });
    });
    describe('PageComment', () => {
        describe('constructor', () => {
            it('can construct a PageComment', () => {
                expect.assertions(2);
                const pc = new PageComment(123, 1);
                expect(pc).toBeDefined();
                expect(() => new PageComment()).toThrow();
            });
        });
        describe('operations', () => {
            let pc = null;
            beforeEach(() => {
                fetch.once('{}');
                pc = new PageComment(123, 123);
            });
            afterEach(() => {
                fetch.resetMocks();
                pc = null;
            });
            it('can update a page comment', async () => {
                expect.assertions(1);
                await expect(pc.update()).resolves.toEqual({});
            });
            it('can delete a page comment', async () => {
                expect.assertions(1);
                await expect(pc.delete()).resolves.toBeInstanceOf(global.Response);
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('pageComment API failure');
            let page = null;
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
                page = new PageComment(123, 123);
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can fail updating page comment', async () => {
                expect.assertions(1);
                await expect(page.update()).rejects.toEqual(mockFailed);
            });
            it('can fail deleting page comment', async () => {
                expect.assertions(1);
                await expect(page.delete()).rejects.toEqual(mockFailed);
            });
        });
    });
});
