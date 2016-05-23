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
    get() {
        return Promise.resolve({});
    }
    getJson() {
        return Promise.resolve({});
    }
    getText() {
        return Promise.resolve('');
    }
    post() {
        return Promise.resolve({});
    }
    postJson() {
        return Promise.resolve({});
    }
    put() {
        return Promise.resolve({});
    }
    putJson() {
        return Promise.resolve({});
    }
    delete() {
        return Promise.resolve({});
    }
}
export { Plug };
