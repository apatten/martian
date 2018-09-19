import fetch from 'jest-fetch-mock';
import { PageFile } from '../pageFile.js';
global.fetch = fetch;

describe('Page files', () => {
    describe('constructor', () => {
        it('can construct a new Page File', () => {
            const pf = new PageFile(123, 'foo.jpg');
            expect(pf).toBeDefined();
        });
    });
    describe('operations', () => {
        let pf = null;
        beforeEach(() => {
            fetch.once('{}');
            pf = new PageFile(123, 'file.pdf');
        });
        afterEach(() => {
            fetch.resetMocks();
            pf = null;
        });
        it('can get the file URL', () => {
            expect.assertions(1);
            expect(pf.fileUrl).toBeDefined();
        });
        it('can get the file info', async () => {
            expect.assertions(1);
            await expect(pf.getInfo()).resolves.toEqual({});
        });
        it('can delete a file', async () => {
            expect.assertions(1);
            await expect(pf.delete()).resolves.toBeInstanceOf(global.Response);
        });
        it('can get the file description', async () => {
            expect.assertions(1);
            await expect(pf.getDescription()).resolves.toEqual({});
        });
        it('can clear the file description', async () => {
            expect.assertions(1);
            await expect(pf.clearDescription()).resolves.toBeInstanceOf(global.Response);
        });
        it('can update the file description (default)', async () => {
            expect.assertions(1);
            await expect(pf.updateDescription()).resolves.toEqual({});
        });
        it('can update the file description (value)', async () => {
            expect.assertions(1);
            await expect(pf.updateDescription('foo')).resolves.toEqual({});
        });
    });
    describe('failures', () => {
        const mockFailed = new Error('pageFile API error');
        let pf = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            pf = new PageFile(123, 'file.pdf');
        });
        afterEach(() => {
            pf = null;
            fetch.resetMocks();
        });
        it('can fail getting the file info', async () => {
            return await expect(pf.getInfo()).rejects.toEqual(mockFailed);
        });
        it('can fail deleting a file attachment from the page', async () => {
            return await expect(pf.delete()).rejects.toEqual(mockFailed);
        });
        it('can fail getting the description of a file attachment', async () => {
            return await expect(pf.getDescription()).rejects.toEqual(mockFailed);
        });
        it('can fail clearing the description of a file attachment', async () => {
            return await expect(pf.clearDescription()).rejects.toEqual(mockFailed);
        });
        it('can fail updating the description of a file attachment', async () => {
            return await expect(pf.updateDescription()).rejects.toEqual(mockFailed);
        });
    });
});
