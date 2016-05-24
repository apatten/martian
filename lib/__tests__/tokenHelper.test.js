/* eslint-env jasmine, jest */
jest.unmock('../tokenHelper');
import { tokenHelper } from '../tokenHelper';
describe('Token Helper node test', () => {
    it('can create a token helper function', () => {
        const th = tokenHelper.createHelper('foo', 'bar');
        expect(th).toBeDefined();
        const token = th();
        expect(token).toBeDefined();
    });
});
