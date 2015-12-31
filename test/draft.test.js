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
import Draft from 'draft';
describe('Draft', () => {
    describe('constructor tests', () => {
        it('can construct a new Draft object using draft ID', () => {
            var draft = new Draft(123);
            expect(draft).toBeDefined();
        });
        it('can construct a new Draft object using draft path', () => {
            var draft = new Draft('foo/bar');
            expect(draft).toBeDefined();
            expect(draft._id).toBe('=foo%252Fbar');
        });
        it('can construct a new Draft object using \'home\'', () => {
            var draft = new Draft('home');
            expect(draft).toBeDefined();
            expect(draft._id).toBe('home');
        });
        it('can construct a new Draft object defaulting to \'home\'', () => {
            var draft = new Draft();
            expect(draft).toBeDefined();
            expect(draft._id).toBe('home');
        });
    });
    describe('get stuff tests', () => {
        let draft = null;
        beforeEach(() => {
            draft = new Draft(123);
            jasmine.Ajax.install();
        });
        afterEach(() => {
            draft = null;
            jasmine.Ajax.uninstall();
        });
        it('can get the draft info', (done) => {
            let fullInfoUri = '/@api/deki/drafts/123?';
            jasmine.Ajax.stubRequest(new RegExp(fullInfoUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.draft });
            draft.getFullInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the draft contents', (done) => {
            let contentsUri = '/@api/deki/drafts/123/contents?';
            jasmine.Ajax.stubRequest(new RegExp(contentsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.draftContent });
            draft.getContents().then((r) => {
                expect(r).toBeDefined();
                expect(r.draft).toBe(true);
                done();
            });
        });
        it('can set the draft contents', (done) => {
            let setUri = '/@api/deki/drafts/123/contents?';
            jasmine.Ajax.stubRequest(new RegExp(setUri), null, 'POST').andReturn({ status: 200, responseText: Mocks.draftSetContents });
            draft.setContents('Sample contents').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
