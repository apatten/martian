import fetch from 'jest-fetch-mock';
import { PageSubscriptionManager, PageSubscription } from '../pageSubscription.js';
global.fetch = fetch;

describe('Page Subscription tests', () => {
    describe('PageSubscriptionManager', () => {
        describe('constructor', () => {
            it('can create a new PageSubscriptionManager', () => {
                expect.assertions(1);
                const manager = new PageSubscriptionManager('site_1');
                expect(manager).toBeDefined();
            });
            it('can fail if the site id is not supplied', () => {
                expect.assertions(1);
                expect(() => new PageSubscriptionManager()).toThrow();
            });
        });
        describe('operations', () => {
            beforeEach(() => {
                fetch.once('{}');
            });
            afterEach(() => {
                fetch.resetMocks();
            });
            it('can fetch the page subscriptions', async () => {
                expect.assertions(1);
                const manager = new PageSubscriptionManager('site_1');
                await expect(manager.getSubscriptions()).resolves.toEqual({ subscriptions: [] });
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('pageSubscriptionManager API failure');
            let page = null;
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
                page = new PageSubscriptionManager('site_2');
            });
            afterEach(() => {
                fetch.resetMocks();
                page = null;
            });
            it('can fail getting all page subscriptions', async () => {
                expect.assertions(1);
                await expect(page.getSubscriptions()).rejects.toEqual(mockFailed);
            });
        });
    });
    describe('subscription instance', () => {
        describe('constructor', () => {
            it('can create a new PageSubscription', () => {
                expect.assertions(1);
                const subscription = new PageSubscription('site_1');
                expect(subscription).toBeDefined();
            });
            it('can fail if the site id is not supplied', () => {
                expect.assertions(1);
                expect(() => new PageSubscription()).toThrow();
            });
        });
        describe('operations', () => {
            let sub;
            beforeEach(() => {
                fetch.once('{}');
                sub = new PageSubscription('site_1', 123);
            });
            afterEach(() => {
                fetch.resetMocks();
                sub = null;
            });
            it('can add a subscription for a page (no params)', async () => {
                expect.assertions(1);
                await expect(sub.subscribe()).resolves.toBeInstanceOf(global.Response);
            });
            it('can add a subscription for a page (all params)', async () => {
                expect.assertions(1);
                await expect(sub.subscribe({ recursive: true, type: 'draft' })).resolves.toBeInstanceOf(
                    global.Response
                );
            });
            it('can fail adding a subscription when invalid parameters are supplied', async () => {
                expect.assertions(1);
                await expect(sub.subscribe({ type: 'notvalid', recursive: 1 })).rejects.toEqual(
                    new Error('notvalid does not equal page, notvalid does not equal draft, 1 is not a Boolean value')
                );
            });
            it('can remove a subscription for a page', async () => {
                expect.assertions(1);
                await expect(sub.unsubscribe()).resolves.toBeInstanceOf(global.Response);
            });
            it('can fail removing a subscription when invalid parameters are supplied', async () => {
                expect.assertions(1);
                await expect(sub.unsubscribe({ type: 'notvalid' })).rejects.toEqual(
                    'The type parameter must be a string set to either "page" or "draft".'
                );
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('pageSubscription API failure');
            let ps = null;
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
                ps = new PageSubscription('site_1', 123);
            });
            afterEach(() => {
                fetch.resetMocks();
                ps = null;
            });
            it('can fail subscribing to a page as the current user', async () => {
                expect.assertions(1);
                await expect(ps.subscribe()).rejects.toEqual(mockFailed);
            });
            it('can fail unsubscribing to a page as the current user', async () => {
                expect.assertions(1);
                await expect(ps.unsubscribe()).rejects.toEqual(mockFailed);
            });
        });
    });
});
