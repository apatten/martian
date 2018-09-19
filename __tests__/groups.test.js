import fetch from 'jest-fetch-mock';
import { GroupManager, Group } from '../group.js';
global.fetch = fetch;

describe('Group API', () => {
    describe('GroupManager', () => {
        let gm = null;
        beforeEach(() => {
            fetch.once('{}');
            gm = new GroupManager();
        });
        afterEach(() => {
            gm = null;
            fetch.resetMocks();
        });
        const emptyGroupsResponse = { groups: [] };
        it('can get the listing of all of the groups (no params)', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList()).resolves.toEqual(emptyGroupsResponse);
        });
        it('can get the listing of all of the groups (all params)', async () => {
            expect.assertions(1);
            await expect(
                gm.getGroupList({
                    nameFilter: 'foo',
                    authProvider: 4,
                    limit: 1000,
                    offset: 100,
                    sortBy: 'id'
                })
            ).resolves.toEqual(emptyGroupsResponse);
        });
        it('can get the listing of all of the groups (limit=all)', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList({ limit: 'all' })).resolves.toEqual(emptyGroupsResponse);
        });
        it('can get the listing of all of the groups (empty nameFilter)', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList({ nameFilter: '' })).resolves.toEqual(emptyGroupsResponse);
        });
        it('can fail getting the groups listing with an invalid nameFilter', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList({ nameFilter: 123 })).rejects.toEqual(
                new Error('The group name filter must be a string')
            );
        });
        it('can fail getting the groups listing with an invalid authProvider', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList({ authProvider: '123' })).rejects.toEqual(
                new Error('The auth provider ID must be a number')
            );
        });
        it('can fail getting the groups listing with an invalid limit', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList({ limit: '123' })).rejects.toEqual(
                new Error('The limit parameter must be a number or "all"')
            );
        });
        it('can fail getting the groups listing with an invalid offset', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList({ offset: '123' })).rejects.toEqual(
                new Error('The offset parameter must be a number')
            );
        });
        it('can fail getting the groups listing with an invalid sortBy (wrong type)', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList({ sortBy: 123 })).rejects.toEqual(
                new Error('The sortBy option must be a string')
            );
        });
        it('can fail getting the groups listing with an invalid sortBy (wrong value)', async () => {
            expect.assertions(1);
            await expect(gm.getGroupList({ sortBy: '123' })).rejects.toEqual(
                new Error('The sortBy option must be one of id, name, role, service, -id, -name, -role, -service')
            );
        });
        it('can get a Group object by ID', async () => {
            expect.assertions(1);
            expect(gm.getGroup(132)).toBeInstanceOf(Group);
        });
    });
    describe('GroupManager errors', () => {
        const mockFailed = new Error('groupManager API error');
        let gm = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            gm = new GroupManager();
        });
        afterEach(() => {
            fetch.resetMocks();
            gm = null;
        });
        it('can fail getting the listing of all of the groups', async () => {
            expect.assertions(1);
            await expect(
                gm.getGroupList({
                    nameFilter: 'foo',
                    authProvider: 4,
                    limit: 1000,
                    offset: 100,
                    sortBy: 'id'
                })
            ).rejects.toEqual(mockFailed);
        });
    });
    describe('Group constructor', () => {
        it('can construct a new Group object from the group ID', () => {
            const group = new Group(2);
            expect.assertions(1);
            expect(group).toBeDefined();
        });
        it('can construct a new Group object from the group name', () => {
            const group = new Group('foo');
            expect.assertions(1);
            expect(group).toBeDefined();
        });
        it('can fail gracefully when no group ID is provided', () => {
            expect.assertions(2);
            expect(() => new Group()).toThrow();
            expect(() => Group()).toThrow();
        });
    });
    describe('group functionality', () => {
        let group = null;
        beforeEach(() => {
            fetch.once('{}');
            group = new Group(2);
        });
        afterEach(() => {
            fetch.resetMocks();
            group = null;
        });
        it('can fetch a single group', async () => {
            expect.assertions(1);
            await expect(group.getInfo()).resolves.toEqual({});
        });
        it("can fetch a group's users", async () => {
            expect.assertions(1);
            await expect(group.getUsers()).resolves.toEqual({ users: [] });
        });
        it('can delete a group', async () => {
            expect.assertions(1);
            await expect(group.delete()).resolves.toBeInstanceOf(global.Response);
        });
        it('can remove a user from a group', async () => {
            expect.assertions(1);
            await expect(group.removeUser(132)).resolves.toEqual({});
        });
    });
    describe('Group errors', () => {
        const mockFailed = new Error('groups API error');
        let group = null;
        beforeEach(() => {
            fetch.mockRejectOnce(mockFailed);
            group = new Group(2);
        });
        afterEach(() => {
            fetch.resetMocks();
            group = null;
        });
        it('can fail fetching a single group', async () => {
            expect.assertions(1);
            return await expect(group.getInfo()).rejects.toEqual(mockFailed);
        });
        it("can fail fetching a group's users", async () => {
            expect.assertions(1);
            return await expect(group.getUsers()).rejects.toEqual(mockFailed);
        });
        it('can fail deleting a group', async () => {
            expect.assertions(1);
            return await expect(group.delete()).rejects.toEqual(mockFailed);
        });
        it('can fail removing a user from a group', async () => {
            expect.assertions(1);
            return await expect(group.removeUser()).rejects.toBeDefined();
        });
    });
});
