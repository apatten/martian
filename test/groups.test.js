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
import { modelParser } from '../lib/modelParser';
import { GroupManager, Group } from '../group';

describe('Group API', () => {
    beforeEach(() => {
        spyOn(modelParser, 'createParser').and.returnValue((parsed) => {
            if(parsed && typeof parsed === 'object') {
                return parsed;
            }
        });
    });
    let gm = null;
    beforeEach(() => {
        gm = new GroupManager();
    });
    afterEach(() => {
        gm = null;
    });
    describe('GroupManager', () => {
        it('can get the listing of all of the groups', (done) => {
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
            gm.getGroupList().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get a Group object by ID', () => {
            let group = gm.getGroup(132);
            expect(group).toBeDefined();
        });
    });
    describe('Group constructor', () => {
        it('can construct a new Group object from the group ID', () => {
            let group = new Group(2);
            expect(group).toBeDefined();
        });
        it('can construct a new Group object from the group name', () => {
            let group = new Group('foo');
            expect(group).toBeDefined();
        });
        it('can fail gracefully when no group ID is provided', () => {
            expect(() => new Group()).toThrow();
            expect(() => Group()).toThrow();
        });
    });
    describe('group functionality', () => {
        let group = null;
        beforeEach(() => {
            group = new Group(2);
            spyOn(Plug.prototype, 'get').and.returnValue(Promise.resolve({}));
        });
        afterEach(() => {
            group = null;
        });
        it('can fetch a single group', (done) => {
            group.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can fetch a group\'s users', (done) => {
            group.getUsers().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
