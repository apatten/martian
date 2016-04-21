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
import { Plug } from '../lib/plug';
import { Settings } from '../lib/settings';
import { modelParser } from '../lib/modelParser';
import { UserManager, User } from '../user';

describe('User API', () => {
    beforeEach(() => {
        spyOn(modelParser, 'createParser').and.returnValue((parsed) => {
            if(parsed && typeof parsed === 'object') {
                return parsed;
            }
        });
    });
    let settings = new Settings({ host: 'http://www.example.com', token: 'abcd1234' });
    describe('constructor', () => {
        it('can perform construction operations', () => {
            expect(() => UserManager()).toThrow();
            let u = new UserManager();
            expect(u).toBeDefined();
            let u2 = new UserManager(settings);
            expect(u2).toBeDefined();
        });
    });
    describe('static operations', () => {
        let userManager = null;
        beforeEach(() => {
            userManager = new UserManager(settings);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
        });
        it('can fetch the current user', (done) => {
            userManager.getCurrentUser().then((u) => {
                expect(u).toBeDefined();
                done();
            });
        });
        it('can fetch the list of all users', (done) => {
            userManager.getUsers().then((u) => {
                expect(u).toBeDefined();
                done();
            });
        });
        it('can fetch a list of filtered users', (done) => {
            userManager.searchUsers({ username: 'foo', limit: 20 }).then((u) => {
                expect(u).toBeDefined();
                done();
            });
        });
        it('can fetch a list of filtered users (single)', (done) => {
            userManager.searchUsers({ username: 'foo', limit: 20 }).then((u) => {
                expect(u).toBeDefined();
                done();
            });
        });
        it('can fetch a list of filtered users (empty)', (done) => {
            userManager.searchUsers({ username: 'foo', limit: 20 }).then((u) => {
                expect(u).toBeDefined();
                done();
            });
        });
        it('can fetch a user', () => {
            let u1 = userManager.getUser();
            expect(u1).toBeDefined();
            let u2 = userManager.getUser(1);
            expect(u2).toBeDefined();
        });
    });
    describe('instance operations', () => {
        beforeEach(() => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
        });
        it('can construct a User without the manager', () => {
            let user1 = new User();
            expect(user1).toBeDefined();
            let user2 = new User(settings);
            expect(user2).toBeDefined();
            let user3 = new User(123, settings);
            expect(user3).toBeDefined();
        });
        it('can get the info for a user', (done) => {
            let user = new User(123, settings);
            user.getInfo().then((u) => {
                expect(u).toBeDefined();
                done();
            });
        });
    });
});
