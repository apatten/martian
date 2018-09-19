import fetch from 'jest-fetch-mock';
import { UserManager, User } from '../user.js';
global.fetch = fetch;

describe('User API', () => {
    const emptyUserResponse = { groups: [] };
    describe('UserManager', () => {
        describe('constructor', () => {
            it('can perform construction operations', () => {
                expect.assertions(3);
                expect(() => UserManager()).toThrow();
                let u = new UserManager();
                expect(u).toBeDefined();
                let u2 = new UserManager();
                expect(u2).toBeDefined();
            });
        });
        describe('operations', () => {
            let userManager = null;
            beforeEach(() => {
                fetch.once('{}');
                userManager = new UserManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                userManager = null;
            });
            it('can fetch the current user', async () => {
                expect.assertions(1);
                await expect(userManager.getCurrentUser()).resolves.toEqual(emptyUserResponse);
            });
            it('can fetch the current user with excluded elements array', async () => {
                expect.assertions(1);
                await expect(userManager.getCurrentUser({ exclude: ['groups', 'properties'] })).resolves.toEqual(
                    emptyUserResponse
                );
            });
            it('can fail if the `exclude` parameter is not an array', async () => {
                expect.assertions(1);
                await expect(userManager.getCurrentUser({ exclude: 'groups' })).rejects.toEqual(
                    new Error('groups is not an array')
                );
            });
            it('can fetch the list of all users', async () => {
                expect.assertions(1);
                await expect(userManager.getUsers()).resolves.toEqual({
                    users: []
                });
            });
            it('can fetch a list of filtered users', async () => {
                expect.assertions(1);
                await expect(userManager.searchUsers({ username: 'foo', limit: 20 })).resolves.toEqual({
                    users: []
                });
            });
            it('can authenticate a user (GET)', async () => {
                expect.assertions(1);
                await expect(userManager.authenticate({ username: 'admin', password: 'password' })).resolves.toEqual(
                    '{}'
                );
            });
            it('can authenticate a user (POST)', async () => {
                expect.assertions(1);
                await expect(
                    userManager.authenticate({ username: 'admin', password: 'password', method: 'POST' })
                ).resolves.toEqual('{}');
            });
            it('can authenticate a user (invalid method)', async () => {
                expect.assertions(1);
                await expect(
                    userManager.authenticate({ username: 'admin', password: 'password', method: 'DELETE' })
                ).rejects.toEqual(new Error('GET and POST are the only valid methods for user authentication.'));
            });
            it('can fetch a user', () => {
                expect.assertions(2);
                let u1 = userManager.getUser();
                expect(u1).toBeInstanceOf(User);
                let u2 = userManager.getUser(1);
                expect(u2).toBeInstanceOf(User);
            });
        });
        describe('User activity token header', () => {
            it('rejects if cannot get X-Deki-Session header when fetching current user activity token', async () => {
                fetch.once('{}');
                const userManager = new UserManager();
                await expect(userManager.getCurrentUserActivityToken()).rejects.toEqual(
                    new Error('Could not fetch an X-Deki-Session HTTP header from the MindTouch API.')
                );
                fetch.resetMocks();
            });
            it('can fetch the current user activity token', async () => {
                fetch.once('{"@id":"123"}', { headers: { 'X-Deki-Session': 'bar' } });
                const userManager = new UserManager();
                await expect(userManager.getCurrentUserActivityToken()).resolves.toEqual('123:bar');
                fetch.resetMocks();
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('userManager API failure');
            let user = null;
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
                user = new UserManager();
            });
            afterEach(() => {
                fetch.resetMocks();
                user = null;
            });
            it('can handle a rejection properly for UserManager.prototype.getCurrentUser', async () => {
                expect.assertions(1);
                await expect(user.getCurrentUser()).rejects.toEqual(mockFailed);
            });
            it('can handle a rejection properly for UserManager.prototype.getCurrentUserActivityToken', async () => {
                expect.assertions(1);
                await expect(user.getCurrentUserActivityToken()).rejects.toEqual(mockFailed);
            });
            it('can handle a rejection properly for UserManager.prototype.getUsers', async () => {
                expect.assertions(1);
                await expect(user.getUsers()).rejects.toEqual(mockFailed);
            });
            it('can handle a rejection properly for UserManager.prototype.searchUsers', async () => {
                expect.assertions(1);
                await expect(user.searchUsers({ username: 'foo', limit: 20 })).rejects.toEqual(mockFailed);
            });
        });
    });
    describe('User', () => {
        describe('constructor', () => {
            it('can construct a User without the manager', () => {
                expect.assertions(2);
                const user1 = new User();
                expect(user1).toBeDefined();
                const user3 = new User(123);
                expect(user3).toBeDefined();
            });
        });
        describe('operations', () => {
            let user = null;
            beforeEach(() => {
                fetch.once('{}');
                user = new User(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                user = null;
            });
            it('can get the info for a user', async () => {
                expect.assertions(1);
                await expect(user.getInfo()).resolves.toEqual(emptyUserResponse);
            });
            it('can get the info for a user with excluded elements array', async () => {
                expect.assertions(1);
                await expect(user.getInfo({ exclude: ['groups', 'properties'] })).resolves.toEqual(emptyUserResponse);
            });
            it('can fail if exclude is not an array', async () => {
                await expect(user.getInfo({ exclude: 'group,properties' })).rejects.toEqual(
                    new Error('group,properties is not an array')
                );
            });
            it('can check permissions for a user', async () => {
                expect.assertions(1);
                await expect(user.checkAllowed([20], { mask: 256, operations: ['UPDATE'] })).resolves.toEqual({
                    pages: []
                });
            });
            it('can check permissions for a user (no operations)', async () => {
                expect.assertions(1);
                await expect(user.checkAllowed([20], { mask: 256 })).resolves.toEqual({
                    pages: []
                });
            });
            it('can check permissions for a user (no options)', async () => {
                expect.assertions(1);
                await expect(user.checkAllowed([20])).resolves.toEqual({
                    pages: []
                });
            });
            it('can fail if page IDs is not an array while checking user permissions', async () => {
                expect.assertions(1);
                await expect(user.checkAllowed(20, { mask: 256 })).rejects.toEqual(new Error('20 is not an array'));
            });
            it('can fail if `operations` is not an array while checking user permissions', async () => {
                expect.assertions(1);
                await expect(user.checkAllowed([20], { operations: 256 })).rejects.toEqual(
                    new Error('256 is not an array')
                );
            });
            it('can update user information (all params)', async () => {
                expect.assertions(1);
                await expect(
                    user.update({
                        active: true,
                        seated: true,
                        username: 'foo',
                        fullName: 'Mr. Foo',
                        email: 'foo@example.com',
                        language: 'en-US',
                        timeZone: '-8:00'
                    })
                ).resolves.toEqual(emptyUserResponse);
            });
            it('can update user information (status => inactive)', async () => {
                expect.assertions(1);
                await expect(user.update({ active: false })).resolves.toEqual(emptyUserResponse);
            });
            it('can fail if the user information is invalid', async () => {
                await expect(user.update({ username: [true] })).rejects.toEqual(new Error('true is not a string'));
            });
            it('can change the user password', async () => {
                expect.assertions(1);
                await expect(user.setPassword({ newPassword: 'foo', currentPassword: 'bar' })).resolves.toEqual({
                    authToken: '{}'
                });
            });
            it('can change the user password (newPassword only)', async () => {
                expect.assertions(1);
                await expect(user.setPassword({ newPassword: 'foo' })).resolves.toEqual({
                    authToken: '{}'
                });
            });
            it('can fail if the user password change is missing the new password field', async () => {
                await expect(user.setPassword({ currentPassword: 'bar' })).rejects.toEqual(
                    new Error('The value of newPassword is not defined')
                );
            });
        });
        describe('failures', () => {
            const mockFailed = new Error('user API failure');
            let user = null;
            beforeEach(() => {
                fetch.mockRejectOnce(mockFailed);
                user = new User(123);
            });
            afterEach(() => {
                fetch.resetMocks();
                user = null;
            });
            it('can handle a rejection properly for User.prototype.update', async () => {
                expect.assertions(1);
                await expect(user.update({ active: false })).rejects.toBeDefined();
            });
            it('can handle a rejection properly for User.prototype.getInfo', async () => {
                expect.assertions(1);
                await expect(user.getInfo()).rejects.toEqual(mockFailed);
            });
            it('can handle a rejection properly for User.prototype.setPassword', async () => {
                expect.assertions(1);
                await expect(user.setPassword({ newPassword: 'foo' })).rejects.toBeDefined();
            });
            it('can handle a rejection properly for User.prototype.checkAllowed', async () => {
                expect.assertions(1);
                await expect(user.checkAllowed([123])).rejects.toEqual(mockFailed);
            });
        });
    });
});
