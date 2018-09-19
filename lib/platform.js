/* eslint-env node, browser */
const _platformId = typeof window === 'undefined' ? 'node' : 'browser';
export const platform = {
    get environment() {
        return _platformId;
    },
    base64: {
        encode(rawString) {
            if (_platformId === 'node') {
                // In node, use `Buffer` to encode.
                return new Buffer(rawString).toString('base64');
            }

            // In the browser, use btoa() to encode.
            return window.btoa(rawString);
        },
        decode(b64String) {
            if (_platformId === 'node') {
                // In node, use `Buffer` to decode.
                return new Buffer(b64String, 'base64').toString('utf8');
            }

            // In the browser, use atob() to decode.
            return window.atob(b64String);
        }
    },
    get URL() {
        if (_platformId === 'browser') {
            return window.URL;
        }
        return require('url').URL;
    },
    get defaultHost() {
        if (_platformId === 'browser') {
            return window.location.origin;
        }
        return global.__DefaultMindTouchHost || '';
    }
};
