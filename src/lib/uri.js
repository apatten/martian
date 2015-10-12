import Url from 'url';
import UriHash from './uriHash';
import stringUtility from './stringUtility';
export default class Uri {
    constructor(url = '') {
        this.parsedUrl = Url.parse(url, true);
        this.parsedUrl.search = null;
    }
    path() {
        return this.parsedUrl.pathname;
    }
    getSegments() {
        var path = this.path();
        if(stringUtility.startsWith(path, '/')) {
            path = stringUtility.leftTrim(path, '/');
        }
        return path.split('/');
    }
    query() {
        return Url.parse(this.toString()).search || '';
    }
    origin() {
        var u = this.parsedUrl;
        return `${u.protocol}//${u.host}`;
    }
    getUriHash() {
        return new UriHash(this.parsedUrl.hash);
    }
    getProtocol() {
        return this.parsedUrl.protocol;
    }
    addQueryParam(key, value) {
        return this.withParam(key, value);
    }
    addQueryParams(queryMap) {
        return this.withParams(queryMap);
    }
    removeQueryParam(key) {
        if(key in this.parsedUrl.query) {
            delete this.parsedUrl.query[key];
        }
        return this;
    }
    getQueryParamValue(param) {
        var query = this.parsedUrl.query;
        return param in query ? query[param] : null;
    }
    withParam(key, value) {
        this.parsedUrl.query[key] = value;
        return this;
    }
    withParams(queryMap) {
        var self = this;
        Object.keys(queryMap).forEach(function(key) {
            self.addQueryParam(key, queryMap[key]);
        });
        return self;
    }
    addSegments(...segments) {
        let path = '';
        segments.forEach(function(segment) {
            if(Array.isArray(segment)) {
                segment.forEach(function(arraySegment) {
                    path = `${path}/${arraySegment}`;
                });
            } else {
                path = `${path}/${segment}`;
            }
        });
        let pathName = this.parsedUrl.pathname || '';
        this.parsedUrl.pathname = `${pathName}${path}`;
        this.parsedUrl = Url.parse(this.parsedUrl);
    }
    toString() {
        return Url.format(this.parsedUrl);
    }
}
