/* eslint-env node */
class Response {
    json() {
        return Promise.resolve({});
    }
    text() {
        return Promise.resolve('');
    }
    blob() {
        return Promise.resolve();
    }
    get headers() {
        return this._get_headers();
    }

    // eslint-disable-next-line camelcase
    _get_headers() {
        return {
            get: () => {
                return '';
            }
        };
    }
}
module.exports = Response;
