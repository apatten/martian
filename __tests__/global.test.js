import bundle from '../global.js';

describe('Global Bundle', () => {
    it('has global client x-deki-client header', () => {
        expect.assertions(1);
        expect(bundle.Settings.default.headers).toEqual({
            'X-Deki-Client': 'mindtouch-martian-global'
        });
    });
});
