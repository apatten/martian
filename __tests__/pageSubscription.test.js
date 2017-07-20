/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
                return sub.subscribe({ type: 'notvalid', recursive: 1 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
            it('can remove a subscription for a page', () => {
                return sub.unsubscribe();
            });
            it('can fail removing a subscription when invalid parameters are supplied', () => {
                const failed = jest.fn();
                return sub.unsubscribe({ type: 'notvalid' }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
            });
        });
    });
});
