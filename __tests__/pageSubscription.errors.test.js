/* eslint-env jasmine, jest */

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);
jest.unmock('../pageSubscription.js');
import { PageSubscriptionManager, PageSubscription } from '../pageSubscription.js';

describe('Page Subscriptions', () => {
    let page = null;
    beforeEach(() => {
        page = new PageSubscription('site_1', 123);
    });
    it('can fail subscribing to a page as the current user', async () => {
        expect.assertions(1);
        return await expect(page.subscribe()).rejects.toEqual(mockFailed);
    });
    it('can fail unsubscribing to a page as the current user', async () => {
        expect.assertions(1);
        return await expect(page.unsubscribe()).rejects.toEqual(mockFailed);
    });
});

describe('Page Subscription Manager', () => {
    let page = null;
    beforeEach(() => {
        page = new PageSubscriptionManager('site_2', 123);
    });
    it('can fail getting all page subscriptions', async () => {
        expect.assertions(1);
        return await expect(page.getSubscriptions()).rejects.toEqual(mockFailed);
    });
});
