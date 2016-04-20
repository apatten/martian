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
import { WorkflowManager } from '../workflows';
describe('Workflows', () => {
    describe('constructor', () => {});
    describe('operations', () => {
        describe('submit feedback', () => {
            let wm = null;
            beforeEach(() => {
                wm = new WorkflowManager();
                spyOn(Plug.prototype, 'post').and.returnValue(Promise.resolve({}));
            });
            afterEach(() => {
                wm = null;
            });
            it('can submit page feedback', (done) => {
                wm.submitFeedback({}).then(() => {
                    done();
                });
            });
            it('can send a request article message', (done) => {
                wm.requestArticle({}).then(() => {
                    done();
                });
            });
            it('can send a submit issue message', (done) => {
                wm.submitIssue({}).then(() => {
                    done();
                });
            });
            it('can send a contact support message', (done) => {
                wm.contactSupport({}).then(() => {
                    done();
                });
            });
        });
    });
});
