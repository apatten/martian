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
import feedback from 'feedback';
describe('Feedback API', () => {
    beforeEach(() => {
        jasmine.Ajax.install();
    });
    afterEach(() => {
        jasmine.Ajax.uninstall();
    });
    it('can submit page feedback', (done) => {
        let feedbackUri = '/@api/deki/workflow/submit-feedback?';
        jasmine.Ajax.stubRequest(new RegExp(feedbackUri), null, 'POST').andReturn({ status: 200 });
        feedback.submit({}).then(() => {
            done();
        });
    });
    it('can handle a page feedback submit error', (done) => {
        let feedbackUri = '/@api/deki/workflow/submit-feedback?';
        jasmine.Ajax.stubRequest(new RegExp(feedbackUri), null, 'POST').andReturn({ status: 500 });
        feedback.submit({}).catch((e) => {
            expect(e.message).toBe('Status 500 from request');
            done();
        });
    });
    it('can fetch the ratings for a set of pages', (done) => {
        let ratingsUri = '/@api/deki/pages/ratings?';
        jasmine.Ajax.stubRequest(new RegExp(ratingsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.pageRatings });
        feedback.getRatingsForPages([ 440, 441 ]).then((r) => {
            expect(r).toBeDefined();
            done();
        });
    });
    it('can handle an error while fetching page ratings', (done) => {
        let ratingsUri = '/@api/deki/pages/ratings?';
        jasmine.Ajax.stubRequest(new RegExp(ratingsUri), null, 'GET').andReturn({ status: 400 });
        feedback.getRatingsForPages([ 440, 441 ]).catch((e) => {
            expect(e.message).toBe('Status 400 from request');
            done();
        });
    });
});
