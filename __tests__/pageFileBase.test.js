/* eslint-env jasmine, jest */
jest.unmock('../pageFileBase.js');
import { PageFileBase } from '../pageFileBase.js';

describe('Page file base', () => {
    it('can not construct a PageFileBase object directly', () => {
        expect(() => new PageFileBase()).toThrowError(TypeError);
    });
});
