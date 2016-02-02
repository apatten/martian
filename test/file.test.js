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
import {Plug} from 'lib/plug';
import {fileModel} from 'models/file.model';
import {fileRevisionsModel} from 'models/fileRevisions.model';
import {File} from 'file';
describe('File API', () => {
    describe('constructor', () => {
        it('can construct a new File', () => {
            let file = new File(123);
            expect(file).toBeDefined();
        });
    });
    describe('operations', () => {
        let file = null;
        beforeEach(() => {
            file = new File(123);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
        });
        afterEach(() => {
            file = null;
        });
        it('can fetch file info', (done) => {
            spyOn(fileModel, 'parse').and.returnValue({});
            file.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch file revisions', (done) => {
            spyOn(fileRevisionsModel, 'parse').and.returnValue({});
            file.getRevisions().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can set the file description', (done) => {
            spyOn(Plug.prototype, 'put').and.returnValue(Promise.resolve({}));
            spyOn(fileModel, 'parse').and.returnValue({});
            file.setDescription('This is the description').then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can delete a file', (done) => {
            spyOn(Plug.prototype, 'delete').and.returnValue(Promise.resolve({}));
            file.delete().then(() => {
                done();
            });
        });
    });
});
