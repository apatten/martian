/* eslint-env jasmine, jest */
jest.unmock('../http.js');
import * as http from '../http.js';

describe('HTTP Module', () => {
    it('has expected exported modules', () => {
        expect(Object.keys(http)).toEqual([ 'Plug', 'Uri' ]);
    });
});
