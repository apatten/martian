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
import { modelParser } from '../lib/modelParser';
import { UserEvents } from '../userEvents';

describe('User Events', () => {
    beforeEach(() => {
        spyOn(modelParser, 'createParser').and.returnValue((parsed) => {
            if(parsed && typeof parsed === 'object') {
                return parsed;
            }
        });
    });
    describe('constructor', () => {
        it('can construct a user events object', () => {
            let ue = new UserEvents();
            expect(ue).toBeDefined();
            expect(() => UserEvents()).toThrow();
        });
    });
    describe('functionality', () => {
        let ue = null;
        beforeEach(() => {
            ue = new UserEvents();
        });
        afterEach(() => {
            ue = null;
        });
        it('can fetch activity for a user', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            ue.getActivity('viewer').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can log a search event', (done) => {
            spyOn(Plug.prototype, 'post').and.returnValue(Promise.resolve());
            ue.logSearch('viewer', {}).then(() => {
                done();
            });
        });
        it('can fetch a user\'s history listing', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            ue.getHistory(20).then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch a specific user history event detail', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            ue.getHistoryDetail(20, '1682aa2a-8165-bca3-3033-1176848a90b2').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
