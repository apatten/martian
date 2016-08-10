class Response {
    json() {
        return Promise.resolve({});
    }
    text() {
        return Promise.resolve('');
    }
}
class Uri {
    constructor(url) {
        this.url = url;
    }
    get origin() {
        return this.url;
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
export { Plug, Response, Uri };
