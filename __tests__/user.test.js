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
jest.unmock('../user');
import { UserManager, User } from '../user';
describe('User API', () => {
    describe('constructor', () => {
        it('can perform construction operations', () => {
            expect(() => UserManager()).toThrow();
            let u = new UserManager();
            expect(u).toBeDefined();
            let u2 = new UserManager();
            expect(u2).toBeDefined();
        });
    });
    describe('static operations', () => {
        let userManager = null;
        beforeEach(() => {
            userManager = new UserManager();
        });
        pit('can fetch the current user', () => {
            return userManager.getCurrentUser();
        });
        pit('can fetch the current user with excluded elements array', () => {
            return userManager.getCurrentUser({ excludes: [ 'groups', 'properties' ] });
        });
        pit('can fetch the current user activity id', () => {
            return userManager.getCurrentUserActivityId();
        });
        pit('can fetch the list of all users', () => {
            return userManager.getUsers();
        });
        pit('can fetch a list of filtered users', () => {
            return userManager.searchUsers({ username: 'foo', limit: 20 });
        });
        pit('can fetch a list of filtered users (single)', () => {
            return userManager.searchUsers({ username: 'foo', limit: 20 });
        });
        pit('can fetch a list of filtered users (empty)', () => {
            return userManager.searchUsers({ username: 'foo', limit: 20 });
        });
        it('can fetch a user', () => {
            let u1 = userManager.getUser();
            expect(u1).toBeDefined();
            let u2 = userManager.getUser(1);
            expect(u2).toBeDefined();
        });
    });
    describe('instance operations', () => {
        it('can construct a User without the manager', () => {
            let user1 = new User();
            expect(user1).toBeDefined();
            let user3 = new User(123);
            expect(user3).toBeDefined();
        });
        pit('can get the info for a user', () => {
            let user = new User(123);
            return user.getInfo();
        });
        pit('can get the info for a user with excluded elements array', () => {
            let user = new User(123);
            return user.getInfo({ excludes: [ 'groups', 'properties' ] });
        });
    });
});
