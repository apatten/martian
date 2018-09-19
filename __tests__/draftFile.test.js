import { DraftFile } from '../draftFile.js';
global.fetch = {};

describe('Draft files', () => {
    describe('constructor', () => {
        it('can fail to construct a new Draft File if no file name is supplied', () => {
            expect.assertions(1);
            expect(() => new DraftFile(123)).toThrowError(new Error('The filename must be a string'));
        });
        it('can construct a new Draft File', () => {
            expect.assertions(1);
            const df = new DraftFile(123, 'foo.jpg');
            expect(df).toBeDefined();
        });
    });
});
