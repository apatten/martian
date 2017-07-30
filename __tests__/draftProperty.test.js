/* eslint-env jasmine, jest */
jest.unmock('../pagePropertyBase.js');
jest.unmock('../draftProperty.js');
import { DraftProperty } from '../draftProperty.js';

describe('Draft Property', () => {
    it('can construct a new draft property', () => {
        const draftProp = new DraftProperty();
        expect(draftProp).toBeDefined();
    });
});
