/* eslint-env jasmine, jest */
jest.unmock('../pageBase.js');
import { PageBase } from '../pageBase.js';

describe('Page Base', () => {
    it('can not construct a PageBase object directly', () => {
        expect(() => new PageBase()).toThrowError(TypeError);
    });
});
