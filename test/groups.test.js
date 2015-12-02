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
import Group from 'group';
describe('Group API', () => {
    beforeEach(() => {
        jasmine.Ajax.install();
    });
    afterEach(() => {
        jasmine.Ajax.uninstall();
    });
    describe('static functions', () => {
        let groupsUri = '/@api/deki/groups?';
        it('can get the listing of all of the groups', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(groupsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.groupListing });
            Group.getGroupList().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get an empty listing of the groups', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(groupsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.groupListingEmpty });
            Group.getGroupList().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can get the listing of a single group', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(groupsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.groupListingSingle });
            Group.getGroupList().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
        it('can handle an HTTP error when fetching the groups', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(groupsUri), null, 'GET').andReturn({ status: 400, responseText: '' });
            Group.getGroupList().catch((e) => {
                expect(e.message).toBe('Status 400 from request');
                done();
            });
        });
        it('can handle invalid JSON when fetching the groups', (done) => {
            jasmine.Ajax.stubRequest(new RegExp(groupsUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.invalidJson });
            Group.getGroupList().catch((e) => {
                expect(e.message).toBe('Unable to parse JSON string');
                done();
            });
        });
    });
    describe('constructor', () => {
        it('can construct a new Group object from the group ID', () => {
            let group = new Group(2);
            expect(group).toBeDefined();
        });
        it('can construct a new Group object from the group name', () => {
            let group = new Group('foo');
            expect(group).toBeDefined();
        });
        it('can fail gracefully when no group ID is provided', () => {
            expect(() => {
                let g = new Group();
                g = null;
            }).toThrow();
        });
    });
    describe('group functionality', () => {
        let group = null;
        beforeEach(() => {
            group = new Group(2);
        });
        afterEach(() => {
            group = null;
        });
        it('can fetch a single group', (done) => {
            let groupUri = '/@api/deki/groups/2?';
            jasmine.Ajax.stubRequest(new RegExp(groupUri), null, 'GET').andReturn({ status: 200, responseText: Mocks.group });
            group.getInfo().then((r) => {
                expect(r).toBeDefined();
                done();
            });
        });
    });
});
