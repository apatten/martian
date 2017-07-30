/* eslint-env jasmine, jest */
jest.unmock('../file.js');
import { File, FileDraft } from '../file.js';

describe('File API', () => {
    describe('constructor', () => {
        it('can construct a new File', () => {
            const file = new File(123);
            expect(file).toBeDefined();
            expect(() => File()).toThrow();
        });
        it('can construct a new FileDraft', () => {
            const fileDraft = new FileDraft(123);
            expect(fileDraft).toBeDefined();
            expect(() => FileDraft()).toThrow();
        });
    });
    describe('operations', () => {
        let file = null;
        beforeEach(() => {
            file = new File(123);
        });
        afterEach(() => {
            file = null;
        });
        it('can fetch file info', () => {
            return file.getInfo();
        });
        it('can fetch file revisions', () => {
            return file.getRevisions();
        });
        it('can set the file description', () => {
            return file.setDescription('This is the description');
        });
        it('can delete a file', () => {
            return file.delete();
        });
        it('can add a file revision (no progress)', () => {
            return file.addRevision({}, { name: 'test.png', type: 'image/png', size: 1000 });
        });
        it('can add a file revision (no added info)', () => {
            return file.addRevision({ name: 'test.png', type: 'image/png', size: 1000 });
        });
        it('can add a file revision with progress', () => {
            return file.addRevision({}, { name: 'test.png', type: 'image/png', size: 1000, progress: () => {} });
        });
        it('can add a file revision with progress (no added info)', () => {
            return file.addRevision({}, { name: 'test.png', type: 'image/png', size: 1000, progress: () => {} });
        });
        it('can move a file', () => {
            return file.move({ to: 'foo/bar', name: 'image.jpg' });
        });
        it('can fail if no `to` parameter is sent to move()', () => {
            const success = jest.fn();
            return file.move().then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
        it('can fail if no `name` parameter is sent to move()', () => {
            const success = jest.fn();
            return file.move({ to: 'foo/bar' }).then(() => {
                success();
                throw new Error('The promise was resolved.');
            }).catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
        });
    });
});
