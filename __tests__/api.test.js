/* eslint-env jasmine, jest */
jest.unmock('../api.js');
import { Api } from '../api.js';

describe('API Module', () => {
    let api = null;
    beforeEach(() => {
        api = new Api();
    });
    it('can verify a successful HTTP request', () => {
        return api.http();
    });
    it('can verify a successful F1 request', () => {
        return api.f1();
    });
});
