/* eslint-env jasmine, jest */
jest.unmock('../../tokenHelper.js');
const tokenHelper = require('../../tokenHelper.js');

describe('Token Helper node test', () => {
    it('can create a username token helper function', () => {
        const th = tokenHelper.nameTokenGenerator('foo', 'bar');
        expect(th).toBeDefined();
        const tokenParts = th('user').split('_');
        expect(tokenParts.length).toBe(4);
    });
    it('can create a userId token helper function', () => {
        const th = tokenHelper.idTokenGenerator('foo', 'bar');
        expect(th).toBeDefined();
        const tokenParts = th(5).split('_');
        expect(tokenParts.length).toBe(4);
    });
});
