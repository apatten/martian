/* eslint-env jasmine, jest */
jest.unmock('/mindtouch-http.js/plug.js');
jest.mock('/mindtouch-http.js/plug.js', () => require.requireActual('../__mocks__/plug.js'));
jest.unmock('/mindtouch-http.js/progressPlug.js');
jest.mock('/mindtouch-http.js/progressPlug.js', () => require.requireActual('../__mocks__/progressPlug.js'));

jest.unmock('../siteReports.js');

describe('Error handling for the siteReports.js module', () => {
    it('can get through virtual page checking when there is another failure (no responseText)', () => {
        jest.mock('/mindtouch-http.js/plug.js', () =>
            require.requireActual('../__mocks__/customPlug.js')({
                get() {
                    return Promise.reject({ message: 'Bad Request', status: 400, responseText: '{}' });
                }
            })
        );
        const SiteReports = require('../siteReports.js').SiteReports;
        const sr = new SiteReports();
        const success = jest.fn();
        return sr
            .getSiteHealth()
            .then(() => {
                success();
                throw new Error('Promise resolved');
            })
            .catch(() => {
                expect(success).not.toHaveBeenCalled();
            });
    });
});
