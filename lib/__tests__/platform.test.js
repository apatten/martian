import { platform } from '../platform.js';

describe('Platform tests', () => {
    it('can get a base64 encoding function', () => {
        expect.assertions(2);
        const encode = platform.base64.encode;
        expect(typeof encode).toBe('function');
        expect(encode('foo')).toBe('Zm9v');
    });
    it('can get a base64 decoding function', () => {
        expect.assertions(2);
        const decode = platform.base64.decode;
        expect(typeof decode).toBe('function');
        expect(decode('Zm9v')).toBe('foo');
    });
    it('can get a platform-specific URL implementation', () => {
        const _URL = platform.URL;
        const url = new _URL('bar/baz', 'https://example.com/foo/');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/foo/bar/baz');
    });
});
