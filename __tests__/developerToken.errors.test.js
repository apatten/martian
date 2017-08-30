/* eslint-env jasmine, jest */
jest.mock('/mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/customPlug.js')({
    delete: () => Promise.reject()
}));
const DeveloperToken = require.requireActual('../developerToken.js').DeveloperToken;

describe('Developer Token Errors', () => {
    it('can fail if the delete operation is rejected', () => {
        const failed = jest.fn();
        const dt = new DeveloperToken(11);
        dt.delete().catch(failed).then(() => expect(failed).toHaveBeenCalled());
    });
});
