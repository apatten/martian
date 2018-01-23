/* eslint-env jasmine, jest */
jest.unmock('../linkToCase.js');
import { LinkToCase } from '../linkToCase.js';

describe('LinkToCase API', () => {
    describe('constructor', () => {
        it('can fail if a case ID is not supplied', () => {
            expect(() => new LinkToCase()).toThrow();
        });
    });
    describe('instance', () => {
        let ltc = null;
        beforeEach(() => {
            ltc = new LinkToCase('abcd12341');
        });
        afterEach(() => {
            ltc = null;
        });
        it('can get a blank list of linked pages', () => {
            return ltc.getPageLinks();
        });
    });
});
