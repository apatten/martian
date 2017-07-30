/* eslint-env jasmine, jest */
jest.unmock('../pagePropertyBase.js');
import { PagePropertyBase } from '../pagePropertyBase.js';

describe('Page Property Base', () => {
    it('can not construct a PagePropertyBase object directly', () => {
        expect(() => new PagePropertyBase()).toThrowError(TypeError);
    });
});
