/* eslint-env jasmine, jest */
jest.unmock('../pageSubscription.js');
import { PageSubscriptionManager, PageSubscription } from '../pageSubscription.js';

describe('Page Subscription tests', () => {
    describe('manager', () => {
        it('can create a new PageSubscriptionManager', () => {
            const manager = new PageSubscriptionManager('site_1');
            expect(manager).toBeDefined();
        });
        it('can fail if the site id is not supplied', () => {
            expect(() => new PageSubscriptionManager()).toThrow();
        });
        it('can fetch the page subscriptions', () => {
            const manager = new PageSubscriptionManager('site_1');
            return manager.getSubscriptions();
        });
    });
    describe('subscription instance', () => {
        describe('constructor', () => {
            it('can create a new PageSubscription', () => {
                const subscription = new PageSubscription('site_1');
                expect(subscription).toBeDefined();
            });
            it('can fail if the site id is not supplied', () => {
                expect(() => new PageSubscription()).toThrow();
            });
        });
        describe('operations', () => {
            let sub;
            beforeEach(() => {
                sub = new PageSubscription('site_1', 123);
            });
            afterEach(() => {
                sub = null;
            });
            it('can add a subscription for a page (no params)', () => {
                return sub.subscribe();
            });
            it('can add a subscription for a page (all params)', () => {
                return sub.subscribe({ recursive: true, type: 'draft' });
            });
            it('can fail adding a subscription when invalid parameters are supplied', () => {
                const failed = jest.fn();
                return sub
                    .subscribe({ type: 'notvalid', recursive: 1 })
                    .catch(failed)
                    .then(() => expect(failed).toHaveBeenCalled());
            });
            it('can remove a subscription for a page', () => {
                return sub.unsubscribe();
            });
            it('can fail removing a subscription when invalid parameters are supplied', () => {
                const failed = jest.fn();
                return sub
                    .unsubscribe({ type: 'notvalid' })
                    .catch(failed)
                    .then(() => expect(failed).toHaveBeenCalled());
            });
        });
    });
});
