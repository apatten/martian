/* eslint-env jasmine, jest */
jest.unmock('../group.js');
import { GroupManager, Group } from '../group.js';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);

describe('Group API', () => {
    let gm = null;
    beforeEach(() => {
        gm = new GroupManager();
    });
    describe('GroupManager', () => {
        it('can fail getting the listing of all of the groups', async () => {
            expect.assertions(1);
            return await expect(
                gm.getGroupList({
                    nameFilter: 'foo',
                    authProvider: 4,
                    limit: 1000,
                    offset: 100,
                    sortBy: 'id'
                })
            ).rejects.toEqual(undefined);
        });
    });
    describe('Group', () => {
        let group = null;
        beforeEach(() => {
            group = new Group(2);
        });
        afterEach(() => {
            group = null;
        });
        it('can fail fetching a single group', async () => {
            expect.assertions(1);
            return await expect(group.getInfo()).rejects.toEqual(undefined);
        });
        it("can fail fetching a group's users", async () => {
            expect.assertions(1);
            return await expect(group.getUsers()).rejects.toEqual(undefined);
        });
        it('can fail deleting a group', async () => {
            expect.assertions(1);
            return await expect(group.delete()).rejects.toEqual(undefined);
        });
        it('can fail removing a user from a group', async () => {
            expect.assertions(1);
            return await expect(group.removeUser()).rejects.toBeDefined();
        });
    });
});
