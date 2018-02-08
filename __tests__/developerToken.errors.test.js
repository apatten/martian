/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () =>
    require.requireActual('../__mocks__/customPlug.js')({
        delete: () => Promise.reject(),
        post: () => Promise.reject()
    })
);
const DT = require.requireActual('../developerToken.js');

describe('Developer Token Errors', () => {
    describe('manager', () => {
        it('can fail if the delete operation is rejected', () => {
            const failed = jest.fn();
            const dt = new DT.DeveloperToken(11);
            dt
                .delete()
                .catch(failed)
                .then(() => expect(failed).toHaveBeenCalled());
        });
    });
    describe('instance', () => {
        it('can fail if the add operation is rejected', () => {
            const failed = jest.fn();
            const dtm = new DT.DeveloperTokenManager();
            dtm
                .addToken({ name: 'foo', host: 'example.com' })
                .catch(failed)
                .then(() => expect(failed).toHaveBeenCalled());
        });
    });
});
