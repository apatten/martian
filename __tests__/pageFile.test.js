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
jest.unmock('../pageFileBase.js');
jest.unmock('../pageFile.js');
import { PageFile } from '../pageFile.js';

describe('Page files', () => {
    describe('constructor', () => {
        it('can construct a new Page File', () => {
            const pf = new PageFile();
            expect(pf).toBeDefined();
        });
    });
    describe('operations', () => {
        let pf = null;
        beforeEach(() => {
            pf = new PageFile(123, 'file.pdf');
        });
        afterEach(() => {
            pf = null;
        });
        it('can get the file URL', () => {
            expect(pf.fileUrl).toBeDefined();
        });
        it('can get the file info', () => {
            return pf.getInfo();
        });
        it('can delete a file', () => {
            return pf.delete();
        });
        it('can get the file description', () => {
            return pf.getDescription();
        });
        it('can clear the file description', () => {
            return pf.clearDescription();
        });
        it('can update the file description (default)', () => {
            return pf.updateDescription();
        });
        it('can update the file description (value)', () => {
            return pf.updateDescription('foo');
        });
    });
});
