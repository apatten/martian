/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        get: () => Promise.reject(),
        post: () => Promise.reject(),
        put: () => Promise.reject()
    })
);
const User = require.requireActual('../user.js').User;

describe('Plug Error handling for the user.js module', () => {
    let user = null;
    const failed = jest.fn();
    beforeEach(() => {
        user = new User(123);
    });
    afterEach(() => {
        user = null;
        failed.mockReset();
    });
    it('can handle a rejection properly for User.prototype.update', () => {
        return user
            .update({ seated: false })
            .catch(failed)
            .then(() => expect(failed).toHaveBeenCalled());
    });
    it('can handle a rejection properly for User.prototype.setPassword', () => {
        return user
            .setPassword({ newPassword: 'foo', currentPassword: 'bar' })
            .catch(failed)
            .then(() => expect(failed).toHaveBeenCalled());
    });
});
