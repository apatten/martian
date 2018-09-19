import { Plug } from './plug.js';
import { Settings } from './lib/settings.js';

/**
 * A class for validating HTTP requests to the MindTouch site API.
 */
export class Api {
    /**
     * Construct a new API object.
     * @param {Settings} [settings] The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki');
    }

    /**
     * Validate HTTP request
     * @returns {Promise} A Promise that, when resolved, indicates a successful HTTP request.
     */
    http() {
        return this._plug
            .at('http')
            .get()
            .catch(err => Promise.reject(err));
    }

    /**
     * Validate HTTP request
     * @returns {Promise} A Promise that, when resolved, indicates a successful F1 HTTP request.
     */
    f1() {
        return this._plug
            .at('f1')
            .get()
            .catch(err => Promise.reject(err));
    }
}
