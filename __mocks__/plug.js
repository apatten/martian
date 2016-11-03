/* eslint-env node */
const Response = require.requireActual('./response.js');
class Plug {
    get url() {
        return '';
    }
    at() {
        return new this.constructor();
    }
    withParam() {
        return new this.constructor();
    }
    withParams() {
        return new this.constructor();
    }
    withHeader() {
        return new this.constructor();
    }
    withHeaders() {
        return new this.constructor();
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
