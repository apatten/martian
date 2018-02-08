/* eslint-env jasmine, jest */
const Response = require.requireActual('../__mocks__/response.js');

jest.unmock('../user.js');
import { UserManager, User } from '../user.js';

describe('User API', () => {
    describe('constructor', () => {
        it('can perform construction operations', () => {
            expect(() => UserManager()).toThrow();
            let u = new UserManager();
            expect(u).toBeDefined();
            let u2 = new UserManager();
            expect(u2).toBeDefined();
        });
    });
    describe('static operations', () => {
        let userManager = null;
        const failed = jest.fn();
        beforeEach(() => {
            userManager = new UserManager();
        });
        afterEach(() => {
            userManager = null;
            failed.mockReset();
        });
        it('can fetch the current user', () => {
            return userManager.getCurrentUser();
        });
        it('can fetch the current user with excluded elements array', () => {
            return userManager.getCurrentUser({ exclude: ['groups', 'properties'] });
        });
        it('can fail if the `exclude` parameter is not an array', () => {
            return userManager
                .getCurrentUser({ exclude: 'groups' })
                .catch(failed)
                .then(() => expect(failed).toHaveBeenCalled());
        });
        it('can fetch the current user activity token', () => {
            return userManager.getCurrentUserActivityToken();
        });
        it('rejects if cannot get X-Deki-Session header when fetching current user activity token', done => {
            // eslint-disable-next-line camelcase
            Response.prototype._get_headers = () => {
                return {
                    get: () => {
                        return null;
                    }
                };
            };
            return userManager.getCurrentUserActivityToken().catch(e => {
                expect(e).toBeDefined();
                done();
            });
        });
        it('can fetch the list of all users', () => {
            return userManager.getUsers();
        });
        it('can fetch a list of filtered users', () => {
            return userManager.searchUsers({ username: 'foo', limit: 20 });
        });
        it('can fetch a list of filtered users (single)', () => {
            return userManager.searchUsers({ username: 'foo', limit: 20 });
        });
        it('can fetch a list of filtered users (empty)', () => {
            return userManager.searchUsers({ username: 'foo', limit: 20 });
        });
        it('can authenticate a user (GET)', () => {
            return userManager.authenticate({ username: 'admin', password: 'password' });
        });
        it('can authenticate a user (POST)', () => {
            return userManager.authenticate({ username: 'admin', password: 'password', method: 'POST' });
        });
        it('can authenticate a user (invalid method)', () => {
            return userManager.authenticate({ username: 'admin', password: 'password', method: 'DELETE' }).catch(e => {
                expect(e.message).toBe('GET and POST are the only valid methods for user authentication.');
            });
        });
        it('can fetch a user', () => {
            let u1 = userManager.getUser();
            expect(u1).toBeDefined();
            let u2 = userManager.getUser(1);
            expect(u2).toBeDefined();
        });
    });
    describe('instance operations', () => {
        let user = null;
        const failed = jest.fn();
        beforeEach(() => {
            user = new User(123);
        });
        afterEach(() => {
            user = null;
            failed.mockReset();
        });
        it('can construct a User without the manager', () => {
            let user1 = new User();
            expect(user1).toBeDefined();
            let user3 = new User(123);
            expect(user3).toBeDefined();
        });
        it('can get the info for a user', () => {
            return user.getInfo();
        });
        it('can get the info for a user with excluded elements array', () => {
            return user.getInfo({ exclude: ['groups', 'properties'] });
        });
        it('can fail if exclude is not an array', () => {
            return user
                .getInfo({ exclude: 'group,properties' })
                .catch(failed)
                .then(() => expect(failed).toHaveBeenCalled());
        });
        it('can check permissions for a user', () => {
            return user.checkAllowed([20], { mask: 256, operations: ['UPDATE'] });
        });
        it('can check permissions for a user (no operations)', () => {
            return user.checkAllowed([20], { mask: 256 });
        });
        it('can check permissions for a user (no options)', () => {
            return user.checkAllowed([20]);
        });
        it('can fail if page IDs is not an array while checking user permissions', () => {
            return user
                .checkAllowed(20, { mask: 256 })
                .catch(failed)
                .then(() => expect(failed).toHaveBeenCalled());
        });
        it('can fail if `operations` is not an array while checking user permissions', () => {
            return user
                .checkAllowed([20], { operations: 256 })
                .catch(failed)
                .then(() => expect(failed).toHaveBeenCalled());
        });
        it('can update user information (all params)', () => {
            return user.update({
                active: true,
                seated: true,
                username: 'foo',
                fullName: 'Mr. Foo',
                email: 'foo@example.com',
                language: 'en-US',
                timeZone: '-8:00'
            });
        });
        it('can update user information (status => inactive)', () => {
            return user.update({ active: false });
        });
        it('can fail if the user information is invalid', () => {
            return user
                .update({ username: [] })
                .catch(failed)
                .then(() => expect(failed).toHaveBeenCalled());
        });
        it('can change the user password', () => {
            return user.setPassword({ newPassword: 'foo', currentPassword: 'bar' });
        });
        it('can change the user password (newPassword only)', () => {
            return user.setPassword({ newPassword: 'foo' });
        });
        it('can fail if the user password change is missing the new password field', () => {
            return user
                .setPassword({ currentPassword: 'bar' })
                .catch(failed)
                .then(() => expect(failed).toHaveBeenCalled());
        });
    });
});
