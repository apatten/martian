/* eslint-env jasmine, jest */
jest.unmock('../../tokenHelper.js');
const tokenHelper = require('../../tokenHelper.js');

describe('Token Helper node test', () => {
    it('can create a token with a string and a number', () => {
        const th = tokenHelper.tokenGenerator('foo', 'bar');
        expect(th).toBeDefined();
        expect(th('user').split('_').length).toBe(5);
        expect(th(1).split('_').length).toBe(5);
    });
});
