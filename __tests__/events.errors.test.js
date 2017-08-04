/* eslint-env jasmine, jest */
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
    get: () => Promise.reject(),
    post: () => Promise.reject(),
    put: () => Promise.reject()
}));
const Events = require.requireActual('../events.js').Events;

describe('Events', () => {
    let events = null;
    let failed = jest.fn();
    beforeEach(() => {
        events = new Events();
    });
    afterEach(() => {
        events = null;
        failed.mockReset();
    });
    describe('User History API errors', () => {
        it('can fail if the API returns an error while getting User History', () => {
            return events.getUserHistory().catch(failed).then(() => {
                expect(failed).toHaveBeenCalled();
            });
        });
    });
});
