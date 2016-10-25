/* eslint-env node */
class Uri {
    constructor(url) {
        this.url = url;
    }
    get origin() {
        return this.url;
    }
}
module.exports = { Uri };
