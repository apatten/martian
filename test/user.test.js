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
import User from 'user';
describe('User API', () => {
    describe('constructor', () => {
        it('can perform construction operations', () => {
            expect(() => User()).toThrow();
            let u = new User();
            expect(u).toBeDefined();
        });
    });
    describe('static operations', () => {
        beforeEach(() => {
            jasmine.Ajax.install();
        });
        afterEach(() => {
            jasmine.Ajax.uninstall();
        });
        it('can fetch the current user', (done) => {
            let currentUri = '/@api/deki/users/current?';
            jasmine.Ajax.stubRequest(new RegExp(currentUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.user });
            User.getCurrentUser().then((u) => {
                expect(u).toBeDefined();
                done();
            });
        });
    });
});
