const cookieJar = require('../cookieJar');

describe('Cookie Jar tests', () => {
    const cookieUrl = 'https://www.example.com';
    it('can get all of the cookies', () => {
        return cookieJar.getCookies(cookieUrl);
    });
    it('can get the cookies as a header string', () => {
        return cookieJar.getCookieString(cookieUrl);
    });
    it('can store an array of cookies', () => {
        return Promise.all([
            cookieJar.storeCookies(cookieUrl, 'c1=foo'),
            cookieJar.storeCookies(cookieUrl, ['c1=foo', 'c2=bar'])
        ]);
    });
});
