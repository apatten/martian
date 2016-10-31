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
jest.unmock('../pageBase.js');
jest.unmock('../draft.js');
import { DraftManager, Draft } from '../draft.js';

describe('Draft', () => {
    describe('draft manager', () => {
        it('can construct a new draft manager', () => {
            let dm = new DraftManager();
            expect(dm).toBeDefined();
        });
        it('can create a new draft from nothing', () => {
            let dm = new DraftManager();
            return dm.createDraft('new/draft/path');
        });
        it('can get a Draft object by id', () => {
            let dm = new DraftManager();
            let draft = dm.getDraft(123);
            expect(draft).toBeDefined();
        });
    });
    describe('constructor tests', () => {
        it('can construct a new Draft object using draft ID', () => {
            var draft = new Draft(123);
            expect(draft).toBeDefined();
        });
        it('can construct a new Draft object using draft path', () => {
            var draft = new Draft('foo/bar');
            expect(draft).toBeDefined();
        });
        it('can construct a new Draft object using \'home\'', () => {
            var draft = new Draft('home');
            expect(draft).toBeDefined();
        });
        it('can construct a new Draft object defaulting to \'home\'', () => {
            var draft = new Draft();
            expect(draft).toBeDefined();
        });
        it('can fail when the constructor is not used correctly', () => {
            expect(() => Draft()).toThrow();
        });
    });
    describe('do stuff tests', () => {
        let draft = null;
        beforeEach(() => {
            draft = new Draft(123);
        });
        afterEach(() => {
            draft = null;
        });
        it('can get the draft info', () => {
            return draft.getFullInfo();
        });
        it('can deactivate a draft', () => {
            return draft.deactivate();
        });
        it('can publish a draft', () => {
            return draft.publish();
        });
    });
});
