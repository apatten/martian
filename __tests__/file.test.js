import fetch from 'jest-fetch-mock';
import mock from 'xhr-mock';
import { File, FileDraft } from '../file.js';
global.fetch = fetch;
const xhrMock = mock;

describe('File API', () => {
    describe('constructor', () => {
        it('can construct a new File', () => {
            expect.assertions(2);
            const file = new File(123);
            expect(file).toBeDefined();
            expect(() => File()).toThrow();
        });
        it('can construct a new FileDraft', () => {
            expect.assertions(2);
            const fileDraft = new FileDraft(123);
            expect(fileDraft).toBeDefined();
            expect(() => FileDraft()).toThrow();
        });
    });
    describe('operations', () => {
        let file = null;
        beforeEach(() => {
            fetch.once('{}');
            file = new File(123);
        });
        afterEach(() => {
            fetch.resetMocks();
            file = null;
        });
        it('can fetch file info', async () => {
            expect.assertions(1);
            await expect(file.getInfo()).resolves.toEqual({});
        });
        it('can fetch file revisions', async () => {
            expect.assertions(1);
            await expect(file.getRevisions()).resolves.toEqual({ file: [] });
        });
        it('can set the file description', async () => {
            expect.assertions(1);
            await expect(file.setDescription('This is the description')).resolves.toEqual({});
        });
        it('can delete a file', async () => {
            expect.assertions(1);
            await expect(file.delete()).resolves.toBeInstanceOf(global.Response);
        });
        it('can add a file revision (no progress)', async () => {
            expect.assertions(1);
            await expect(file.addRevision({}, { name: 'test.png', type: 'image/png', size: 1000 })).resolves.toEqual(
                {}
            );
        });
        it('can add a file revision (no added info)', async () => {
            expect.assertions(1);
            await expect(file.addRevision({ name: 'test.png', type: 'image/png', size: 1000 })).resolves.toEqual({});
        });
        it('can add a file revision with progress', async () => {
            expect.assertions(1);
            xhrMock.setup();
            xhrMock.put(/@api\/deki\/files\/123\/=test.png/, (req, res) =>
                res.status(200).body('{"@id":456, "filename":"success.jpg"}')
            );
            await expect(
                file.addRevision('dummy', { name: 'test.png', type: 'image/png', size: 1000, progress: () => {} })
            ).resolves.toEqual({ id: 456, filename: 'success.jpg' });
            xhrMock.teardown();
        });
        it('can move a file', async () => {
            expect.assertions(1);
            await expect(file.move({ to: 'foo/bar', name: 'image.jpg' })).resolves.toEqual({});
        });
        it('can fail if no `to` parameter is sent to move()', async () => {
            expect.assertions(1);
            await expect(file.move()).rejects.toEqual(
                new Error('The `to` parameter must be specified to move a file.')
            );
        });
        it('can fail if no `name` parameter is sent to move()', async () => {
            expect.assertions(1);
            await expect(file.move({ to: 'foo/bar' })).rejects.toEqual(
                new Error('The `name` parameter must be specified to move a file.')
            );
        });
    });
    describe('errors', () => {
        describe('no progress', () => {
            const mockFailed = new Error('file API error');
            let file = null;
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
                file = new File(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                file = null;
            });
            it('can fail fetching file info', async () => {
                expect.assertions(1);
                await expect(file.getInfo()).rejects.toEqual(mockFailed);
            });
            it('can fail fetching file revisions', async () => {
                expect.assertions(1);
                await expect(file.getRevisions()).rejects.toEqual(mockFailed);
            });
            it('can fail setting the file description', async () => {
                expect.assertions(1);
                await expect(file.setDescription()).rejects.toEqual(mockFailed);
            });
            it('can fail deleting a file', async () => {
                expect.assertions(1);
                await expect(file.delete()).rejects.toEqual(mockFailed);
            });
            it('can fail adding a file revision', async () => {
                expect.assertions(1);
                await expect(file.addRevision('fileObj', { name: 'foo.jpg' })).rejects.toEqual(mockFailed);
            });
            it('can fail moving a file', async () => {
                expect.assertions(1);
                await expect(file.move({ to: 'foo/bar', name: 'image.jpg' })).rejects.toBeDefined();
            });
        });
        describe('no progress', () => {
            let file = null;
            beforeEach(() => {
                mock.setup();
                file = new File(123);
            });
            afterEach(() => {
                mock.teardown();
                file = null;
            });
            it('can fail adding a file revision', async () => {
                expect.assertions(1);
                mock.put(/@api\/deki\/files\/123\/=foo.jpg/, {
                    status: 500,
                    body: '{"error":true}'
                });
                await expect(file.addRevision('fileObj', { name: 'foo.jpg', progress: () => {} })).rejects.toEqual({
                    message: 'OK',
                    responseText: '{"error":true}',
                    status: 500
                });
            });
        });
    });
});
