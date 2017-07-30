/* eslint-env jasmine, jest */
jest.unmock('../pageFileBase.js');
jest.unmock('../draftFile.js');
import { DraftFile } from '../draftFile.js';

describe('Draft files', () => {
    describe('constructor', () => {
        it('can construct a new Draft File', () => {
            const df = new DraftFile();
            expect(df).toBeDefined();
        });
    });
});
