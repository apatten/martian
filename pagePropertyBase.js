import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { pagePropertiesModel } from './models/pageProperties.model.js';
import { pagePropertyModel } from './models/pageProperty.model.js';

export class PagePropertyBase {
    constructor(id) {
        if (this.constructor.name === 'PagePropertyBase') {
            throw new TypeError(
                'PagePropertyBase must not be constructed directly.  Use one of PageProperty() or DraftProperty()'
            );
        }
        this._id = utility.getResourceId(id, 'home');
    }

    /**
     * Get all of the properties of the page.
     * @param {Array} [names=[]] - An array of names to fetch so that the results are filtered.
     * @returns {Promise.<pagePropertiesModel>} - A Promise that, when resolved, yields a {@link pagePropertiesModel} object that contains the listing of properties.
     */
    getProperties(names = []) {
        if (!Array.isArray(names)) {
            return Promise.reject(new Error('The property names must be an array'));
        }
        let plug = this._plug;
        if (names.length > 0) {
            plug = plug.withParams({ names: names.join(',') });
        }
        return plug
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(pagePropertiesModel));
    }

    /**
     * Get the contents of a page property.
     * @param {String} key - The key of the property to fetch.
     * @returns {Promise} - A Promise that, when resolved, yields the property contents.  The property can be of any type allowed by the MindTouch property subsystem.
     */
    getPropertyContents(key) {
        if (!key) {
            return Promise.reject(
                new Error('Attempting to fetch a page property contents without providing a property key')
            );
        }
        return this._plug
            .at(encodeURIComponent(key))
            .get()
            .catch(err => Promise.reject(err));
    }

    /**
     * Gets a single page property by property key.
     * @param {String} key - The key of the property to fetch.
     * @returns {Promise.<pagePropertyModel>} - A Promise that, when resolved, yields a {@link pagePropertyModel} object that contains the property information.
     */
    getProperty(key) {
        if (!key) {
            return Promise.reject(new Error('Attempting to fetch a page property without providing a property key'));
        }
        return this._plug
            .at(encodeURIComponent(key), 'info')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(pagePropertyModel));
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
    setProperty(key, value = {}, params = { abort: 'modified' }) {
        if (!key) {
            return Promise.reject(new Error('Attempting to set a property without providing a property key'));
        }
        if (typeof value.text !== 'string') {
            return Promise.reject(new Error('Attempting to set a property without providing a property value'));
        }
        if (!value.type) {
            value.type = utility.textRequestType;
        }
        return this._plug
            .at(encodeURIComponent(key))
            .withParams(params)
            .put(value.text, value.type)
            .catch(err => Promise.reject(err));
    }

    /**
     * Remove a page property
     * @param {String} key - The key of the property to remove
     * @returns {Promise} - A Promise that, when resolved, indicates the property was removed successfully.
     */
    deleteProperty(key) {
        if (!key) {
            return Promise.reject(new Error('Attempting to delete a property without providing a property key'));
        }
        return this._plug
            .at(encodeURIComponent(key))
            .delete()
            .catch(err => Promise.reject(err));
    }
}
