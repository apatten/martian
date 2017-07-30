/* eslint-env jasmine, jest */
jest.unmock('../pageFileBase.js');
jest.unmock('../pageFile.js');
import { PageFile } from '../pageFile.js';

describe('Page files', () => {
    describe('constructor', () => {
        it('can construct a new Page File', () => {
            const pf = new PageFile();
            expect(pf).toBeDefined();
        });
    });
    describe('operations', () => {
        let pf = null;
        beforeEach(() => {
            pf = new PageFile(123, 'file.pdf');
        });
        afterEach(() => {
            pf = null;
        });
        it('can get the file URL', () => {
            expect(pf.fileUrl).toBeDefined();
        });
        it('can get the file info', () => {
            return pf.getInfo();
        });
        it('can delete a file', () => {
            return pf.delete();
        });
        it('can get the file description', () => {
            return pf.getDescription();
        });
        it('can clear the file description', () => {
            return pf.clearDescription();
        });
        it('can update the file description (default)', () => {
            return pf.updateDescription();
        });
        it('can update the file description (value)', () => {
            return pf.updateDescription('foo');
        });
    });
});
