export default class MTError extends Error {

    /*
      Placeholder class to contain the workaround for Babel not being able
      to subclass built-in objects due to ES5 limitations.
    */
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}
