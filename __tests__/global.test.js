/* eslint-env jasmine, jest */
jest.unmock('../main.js');
jest.unmock('../global.js');
jest.unmock('../lib/settings.js');
import bundle from '../global.js';

describe('Global Bundle', () => {
    it('has global client x-deki-client header', () => {
        expect(bundle.Settings.default.headers).toEqual({
            'X-Deki-Client': 'mindtouch-martian-global'
        });
    });
});
