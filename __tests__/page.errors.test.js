/* eslint-env jasmine, jest */
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
    get: () => Promise.reject(),
    post: () => Promise.reject(),
    put: () => Promise.reject()
}));
jest.unmock('../pageBase.js');
const Page = require.requireActual('../page.js').Page;

describe('Plug Error handling for the page.js module', () => {
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
    it('can fail getting the link details', () => {
        return page.getLinkDetails().catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
    it('can fail getting the page health inspections', () => {
        return page.getHealthInspections().catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
    it('can fail setting the contents', () => {
        return page.setContents('sample').catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
});
