class Response {
    json() {
        return Promise.resolve({});
    }
    text() {
        return Promise.resolve('');
    }
}
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
export { Plug, Response };
