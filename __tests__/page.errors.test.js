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
jest.unmock('../pageBase.js');
const Page = require.requireActual('../page.js').Page;

describe('Plug Error handling for the page.js module', () => {
    let page = null;
    const failed = jest.fn();
    beforeEach(() => {
        page = new Page(123);
    });
    afterEach(() => {
        page = null;
        failed.mockReset();
    });
    it('can fail getting a page diff when an HTTP error is returned', () => {
        return page.getDiff({ previous: 11 }).catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
    it('can fail getting the link details', () => {
        return page.getLinkDetails().catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
    it('can fail getting the page health inspections', () => {
        return page.getHealthInspections().catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
    it('can fail setting the contents', () => {
        return page.setContents('sample').catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
});
