/* eslint-env jasmine, jest */

let mockFailed = 'MOCK FAILED';

jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(mockFailed),
        get: () => Promise.reject(mockFailed),
        post: () => Promise.reject(mockFailed),
        put: () => Promise.reject(mockFailed)
    })
);

jest.unmock('../user.js');
import { UserManager, User } from '../user.js';

describe('Plug Error handling for the user.js User module', () => {
    let user = null;
    beforeEach(() => {
        user = new User(123);
    });
    it('can handle a rejection properly for User.prototype.update', async () => {
        expect.assertions(1);
        return await expect(user.update({ active: false })).rejects.toBeDefined();
    });
    it('can handle a rejection properly for User.prototype.getInfo', async () => {
        expect.assertions(1);
        return await expect(user.getInfo()).rejects.toEqual(mockFailed);
    });
    it('can handle a rejection properly for User.prototype.setPassword', async () => {
        expect.assertions(1);
        return await expect(user.setPassword({ newPassword: 'foo' })).rejects.toBeDefined();
    });
    it('can handle a rejection properly for User.prototype.checkAllowed', async () => {
        expect.assertions(1);
        return await expect(user.checkAllowed([123])).rejects.toEqual(mockFailed);
    });
});

describe('Plug Error handling for the user.js UserManager module', () => {
    let user = null;
    beforeEach(() => {
        user = new UserManager(123);
    });
    it('can handle a rejection properly for UserManager.prototype.getCurrentUser', async () => {
        expect.assertions(1);
        return await expect(user.getCurrentUser()).rejects.toEqual(mockFailed);
    });
    it('can handle a rejection properly for UserManager.prototype.getCurrentUserActivityToken', async () => {
        expect.assertions(1);
        return await expect(user.getCurrentUserActivityToken()).rejects.toEqual(mockFailed);
    });
    it('can handle a rejection properly for UserManager.prototype.getUsers', async () => {
        expect.assertions(1);
        return await expect(user.getUsers()).rejects.toEqual(mockFailed);
    });
    it('can handle a rejection properly for UserManager.prototype.searchUsers', async () => {
        expect.assertions(1);
        return await expect(user.searchUsers({ username: 'foo', limit: 20 })).rejects.toEqual(mockFailed);
    });
});
