/* eslint-env jasmine, jest */
import { DraftProperty } from '../draftProperty.js';
global.fetch = {};

describe('Draft Property', () => {
    it('can construct a new draft property', () => {
        expect.assertions(1);
        const draftProp = new DraftProperty();
        expect(draftProp).toBeDefined();
    });
});
