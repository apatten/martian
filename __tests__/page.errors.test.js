/* eslint-env jasmine, jest */
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
    get: () => Promise.reject(),
    post: () => Promise.reject(),
    put: () => Promise.reject()
}));
jest.unmock('../pageBase.js');
const Page = require.requireActual('../page.js').Page;

describe('Error handling for the page.js module', () => {
    let page = null;
    const failed = jest.fn();
    beforeEach(() => {
        page = new Page(123);
    });
    afterEach(() => {
        page = null;
        failed.mockReset();
    });
    it('can fail getting a page diff when an HTTP error is returned', () => {
        return page.getDiff({ previous: 11 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
});
