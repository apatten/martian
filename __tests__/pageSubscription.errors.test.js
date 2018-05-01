/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
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
        return await expect(page.subscribe()).rejects.toEqual(undefined);
    });
    it('can fail unsubscribing to a page as the current user', async () => {
        expect.assertions(1);
        return await expect(page.unsubscribe()).rejects.toEqual(undefined);
    });
});

describe('Page Subscription Manager', () => {
    let page = null;
    beforeEach(() => {
        page = new PageSubscriptionManager('site_2', 123);
    });
    it('can fail getting all page subscriptions', async () => {
        expect.assertions(1);
        return await expect(page.getSubscriptions()).rejects.toEqual(undefined);
    });
});
