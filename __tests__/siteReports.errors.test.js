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
jest.unmock('mindtouch-http.js/plug.js');
jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/plug.js'));
jest.unmock('mindtouch-http.js/progressPlug.js');
jest.mock('mindtouch-http.js/progressPlug.js', () => require.requireActual('../__mocks__/progressPlug.js'));

jest.unmock('../siteReports.js');

describe('Error handling for the siteReports.js module', () => {
    it('can get through virtual page checking when there is another failure (no responseText)', () => {
        jest.mock('mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
            get() {
                return Promise.reject({ message: 'Bad Request', status: 400, responseText: '{}' });
            }
        }));
        const SiteReports = require('../siteReports.js').SiteReports;
        const sr = new SiteReports();
        const success = jest.fn();
        return sr.getSiteHealth().then(() => {
            success();
            throw new Error('Promise resolved');
        }).catch(() => {
            expect(success).not.toHaveBeenCalled();
        });
    });
});
