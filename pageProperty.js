import { Plug } from 'mindtouch-http';
import { Settings } from './lib/settings';
import { utility } from './lib/utility';
import { modelParser } from './lib/modelParser';
import { pagePropertiesModel } from './models/pageProperties.model';
import { pagePropertyModel } from './models/pageProperty.model';

/**
 * A class for managing the properties of a page.
 */
export class PageProperty {

    /**
     * Construct a new PageProperty object.
     * @param {Number|String} [id='home'] The numeric page ID or the page path.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id = 'home', settings = new Settings()) {
        this._id = utility.getResourceId(id, 'home');
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages', this._id, 'properties');
    }

    /**
     * Get all of the properties of the page.
     * @param {Array} [names=[]] - An array of names to fetch so that the results are filtered.
     * @returns {Promise.<pagePropertiesModel>} - A Promise that, when resolved, yields a {@link pagePropertiesModel} object that contains the listing of properties.
     */
    getProperties(names = []) {
        if(!Array.isArray(names)) {
            return Promise.reject(new Error('The property names must be an array'));
        }
        let plug = this._plug;
        if(names.length > 0) {
            plug = plug.withParams({ names: names.join(',') });
        }
        let pagePropertiesModelParser = modelParser.createParser(pagePropertiesModel);
        return plug.get().then((r) => r.json()).then(pagePropertiesModelParser);
    }

    /**
     * Gets a single page property by property key.
     * @param {String} key - The key of the property to fetch.
     * @returns {Promise.<pagePropertyModel>} - A Promise that, when resolved, yields a {@link pagePropertyModel} object that contains the property information.
     */
    getProperty(key) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch a page property without providing a property key'));
        }
        let pagePropertyModelParser = modelParser.createParser(pagePropertyModel);
        return this._plug.at(encodeURIComponent(key), 'info').get().then((r) => r.json()).then(pagePropertyModelParser);
    }

    /**
     * Get the contents of a page property.
     * @param {String} key - The key of the property to fetch.
     * @returns {Promise} - A Promise that, when resolved, yields the property contents.  The property can be of any type allowed by the MindTouch property subsystem.
     */
    getPropertyContents(key) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch a page property contents without providing a property key'));
        }
        return this._plug.at(encodeURIComponent(key)).get();
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
        return this._plug.withParams({ depth: depth, names: key }).get().then((r) => r.json());
    }

    /**
     * Set a property on the page
     * @param {String} key - The key of the property to set
     * @param {Object} value - An object conteining information regarding the value to set.
     * @param {String} value.text - The string value representing the property value to set.
     * @param {String} [value.type=@see utility.textRequestType] - The mime type of the value's text field.
     * @param {Object} params - An object that contains values that will direct the behavior of the operation.
     * @returns {Promise} - A Promise that, when resolved, indicates the property was set successfully.
     */
    setProperty(key, value = { }, params = { abort: 'modified' }) {
        if(!key) {
            return Promise.reject(new Error('Attempting to set a property without providing a property key'));
        }
        if(!value.text) {
            return Promise.reject(new Error('Attempting to set a property without providing a property value'));
        }
        if(!value.type) {
            value.type = utility.textRequestType;
        }
        return this._plug.withParams(params).put(value.text, value.type);
    }
}
