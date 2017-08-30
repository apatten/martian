import { Plug } from '/mindtouch-http.js/plug.js';
import { PagePropertyBase } from './pagePropertyBase.js';
import { Settings } from './lib/settings.js';

/**
 * A class for managing the properties of a page.
 */
export class PageProperty extends PagePropertyBase {

    /**
     * Construct a new PageProperty object.
     * @param {Number|String} [id='home'] The numeric page ID or the page path.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id = 'home', settings = new Settings()) {
        super(id);
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages', this._id, 'properties');
    }

    /**
     * Get a listing of page properties for a hierarchy of pages.
     * @param {String} key - The key of the property to fetch.
     * @param {Number} [depth=1] - Between 0 and 2 levels deep in the search are allowed. If depth is 1 or 2, the names argument only can be a single property to be looked up, and no wildcards are allowed.
     * @returns {Promise} - A Promise that, when resolved, yields the listing of the properties.
     */
    getPropertyForChildren(key, depth = 1) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch properties for children without providing a property key'));
        }
        return this._plug.withParams({ depth, names: key }).get().then((r) => r.json());
    }
}
