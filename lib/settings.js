import { platform } from '../lib/platform.js';
const _URL = platform.URL;

let _defaultHost = platform.defaultHost;
let _defaultOrigin = null;
let _defaultQueryParams = { 'dream.out.format': 'json' };
let _defaultHeaders = { 'X-Deki-Client': 'mindtouch-martian' };
let _defaultToken = null;
let _cookieManager = null;
function _cloneKeyValuePair(obj) {
    const copy = {};
    Object.keys(obj).forEach(key => {
        copy[key] = obj[key];
    });
    return copy;
}

/**
 * Manage settings for how martian performs API requests.
 */
export class Settings {
    static get cookieManager() {
        return _cookieManager;
    }
    static set cookieManager(manager) {
        _cookieManager = manager;
    }
    static get default() {
        return {
            get token() {
                return _defaultToken;
            },
            set token(token) {
                _defaultToken = token;
            },
            get host() {
                return _defaultHost;
            },
            set host(host) {
                _defaultHost = host;
            },
            get origin() {
                return _defaultOrigin;
            },
            set origin(origin) {
                _defaultOrigin = origin;
            },
            get headers() {
                return _defaultHeaders;
            },
            set headers(headers) {
                _defaultHeaders = headers;
            },
            get queryParams() {
                return _defaultQueryParams;
            },
            set queryParams(params) {
                _defaultQueryParams = params;
            },
            reset() {
                _defaultHost = platform.defaultHost;
                _defaultQueryParams = { 'dream.out.format': 'json' };
                _defaultToken = null;
                _defaultHeaders = { 'X-Deki-Client': 'mindtouch-martian' };
                _defaultOrigin = null;
            }
        };
    }

    /**
     * Create a new martian Settings object.
     * @param {Object} [options] The options for the martian settings object.
     * @param {String} [options.host] The URL of the mindtouch site that is hosting the API to access.
     * @param {Object} [options.queryParams] An object mapping query parameter keys with values. Keys and values will both be converted to strings.
     * @param {Object} [options.headers] An object mapping HTTP header keys with values. Keys must be strings, and values will be converted to strings.
     * @param {String|Function} [options.token] A token to allow API access. This will populate the "X-Deki-Token" header. If a function is supplied, it should return the desired token as a string.
     * @param {String} [options.origin] The origin of the API calls.
     */
    constructor({
        host = _defaultHost,
        queryParams = _defaultQueryParams,
        headers = _defaultHeaders,
        token = _defaultToken,
        origin = _defaultOrigin
    } = {}) {
        this._host = host;
        this._token = token;
        this._origin = origin;
        this._queryParams = _cloneKeyValuePair(queryParams);
        this._headers = _cloneKeyValuePair(headers);
        if (this._origin !== null) {
            const originUrl = new _URL(this._origin);
            const hostUrl = new _URL(this._host);
            if (originUrl.origin === hostUrl.origin) {
                this._headers['X-Deki-Requested-With'] = 'XMLHttpRequest';
            }
        }
    }

    /**
     * Get the currently configured host.
     */
    get host() {
        return this._host;
    }

    /**
     * Get the currently configured token.
     */
    get token() {
        return this._token;
    }

    /**
     * Get the currently configured origin.
     */
    get origin() {
        return this._origin;
    }

    /**
     * Get an object that represents the martian settings as they are used by the Plug object.
     */
    get plugConfig() {
        return {
            uriParts: { query: this._queryParams },
            headers: this._headers,
            beforeRequest: params => this._beforeRequest(params),
            cookieManager: _cookieManager
        };
    }
    _beforeRequest(params) {
        if (this._token !== null) {
            let token = this._token;
            if (typeof token === 'function') {
                token = this._token();
            }
            params.headers['X-Deki-Token'] = token;
        }
        return params;
    }
}
