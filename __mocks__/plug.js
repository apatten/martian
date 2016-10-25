/* eslint-env node */
const Response = require.requireActual('./response.js');
class Plug {
    get url() {
        return '';
    }
    at() {
        return new Plug();
    }
    withParam() {
        return new Plug();
    }
    withParams() {
        return new Plug();
    }
    withHeader() {
        return new Plug();
    }
    withHeaders() {
        return new Plug();
    }
    get() {
        return Promise.resolve(new Response());
    }
    post() {
        return Promise.resolve(new Response());
    }
    put() {
        return Promise.resolve(new Response());
    }
    delete() {
        return Promise.resolve(new Response());
    }
}
module.exports = { Plug };
