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
