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
jest.unmock('../file.js');
import { File, FileDraft } from '../file.js';

describe('File API', () => {
    describe('constructor', () => {
        it('can construct a new File', () => {
            const file = new File(123);
            expect(file).toBeDefined();
            expect(() => File()).toThrow();
        });
        it('can construct a new FileDraft', () => {
            const fileDraft = new FileDraft(123);
            expect(fileDraft).toBeDefined();
            expect(() => FileDraft()).toThrow();
        });
    });
    describe('operations', () => {
        let file = null;
        beforeEach(() => {
            file = new File(123);
        });
        afterEach(() => {
            file = null;
        });
        it('can fetch file info', () => {
            return file.getInfo();
        });
        it('can fetch file revisions', () => {
            return file.getRevisions();
        });
        it('can set the file description', () => {
            return file.setDescription('This is the description');
        });
        it('can delete a file', () => {
            return file.delete();
        });
        it('can add a file revision (no progress)', () => {
            return file.addRevision({}, { name: 'test.png', type: 'image/png', size: 1000 });
        });
        it('can add a file revision (no added info)', () => {
            return file.addRevision({ name: 'test.png', type: 'image/png', size: 1000 });
        });
        it('can add a file revision with progress', () => {
            return file.addRevision({}, { name: 'test.png', type: 'image/png', size: 1000, progress: () => {} });
        });
        it('can add a file revision with progress (no added info)', () => {
            return file.addRevision({}, { name: 'test.png', type: 'image/png', size: 1000, progress: () => {} });
        });
    });
});
