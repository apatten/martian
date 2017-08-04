/* eslint-env jasmine, jest */
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
    get: () => Promise.reject(),
    post: () => Promise.reject(),
    put: () => Promise.reject()
}));
jest.unmock('../pageBase.js');
const DraftManager = require.requireActual('../draft.js').DraftManager;
describe('Plug Error handling for the draft.js module', () => {
    let dm = null;
    const failed = jest.fn();
    beforeEach(() => {
        dm = new DraftManager();
    });
    afterEach(() => {
        dm = null;
        failed.mockReset();
    });
    it('can fail to create draft when an HTTP error is returned', () => {
        return dm.createDraft('').catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
});
