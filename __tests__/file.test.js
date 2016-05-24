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
jest.unmock('../file');
import { File } from '../file';

describe('File API', () => {
    describe('constructor', () => {
        it('can construct a new File', () => {
            let file = new File(123);
            expect(file).toBeDefined();
            expect(() => File()).toThrow();
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
        pit('can fetch file info', () => {
            return file.getInfo();
        });
        pit('can fetch file revisions', () => {
            return file.getRevisions();
        });
        pit('can set the file description', () => {
            return file.setDescription('This is the description');
        });
        pit('can delete a file', () => {
            return file.delete();
        });
    });
});
