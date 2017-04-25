import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { webWidgetsModel } from './models/webWidgets.model.js';
import { webWidgetsListModel } from './models/webWidgetsList.model.js';
import { apiErrorModel } from './models/apiError.model.js';

const _errorParser = modelParser.createParser(apiErrorModel);
function isValidArgValue(value) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}
function _makeXmlString(data) {
    if(!data || typeof data !== 'object') {
        throw new Error('Web widget data must be an object');
    }
    if(!Array.isArray(data.arguments) || data.arguments.some((arg) => !arg || typeof arg.name !== 'string' || !isValidArgValue(arg.value))) {
        throw new Error('Web widget arguments must be an array of objects with a `name` string and a `value` string|number|boolean');
    }
    if(!Array.isArray(data.hosts) || data.hosts.some((host) => typeof host !== 'string')) {
        throw new Error('Web widget hosts must be an array of strings');
    }
    if(typeof data.name !== 'string') {
        throw new Error('Web widget name must be a string');
    }
    if(typeof data.type !== 'string') {
        throw new Error('Web widget type must be a string');
    }
    const argData = data.arguments.map((arg) => {
        return `<${arg.name}>${utility.escapeHTML(arg.value)}</${arg.name}>`;
    });
    return `
        <web-widget>
            <arguments>${argData.join('\n')}</arguments>
            <host>${utility.escapeHTML(data.hosts.join(','))}</host>
            <name>${utility.escapeHTML(data.name)}</name>
            <type>${utility.escapeHTML(data.type)}</type>
        </web-widget>
    `;
}

/**
 * A class for managing web widgets.
 */
export class WebWidgetsManager {

    /**
     * Construct a new WebWidgetsManager.
     * @param {Settings} [settings] The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'web-widgets');
    }

    /**
     * Retrieve all active web widgets.
     * @returns {Promise} A Promise, when resolved, provides a list of active web widgets.
     */
    getActiveWidgets() {
        return this._plug.get()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(webWidgetsListModel));
    }

    /**
     * Retrieve all inactive web widgets.
     * @returns {Promise} A Promise, when resolved, provides a list of inactive web widgets.
     */
    getInactiveWidgets() {
        return this._plug.at('inactive').get()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(webWidgetsListModel));
    }

    /**
     * Retrieve an individual web widget.
     * @param {Number|String} [id] The id of the web widget to retrieve.
     * @returns {Promise} A Promise, when resolved, provides info of the retrieved web widget.
     */
    getWidget(id) {
        const widgetId = utility.getResourceId(id);
        return this._plug.at(widgetId).get()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(webWidgetsModel));

    }

    /**
     * Create a new web widget.
     * @param {Object} [options] The data used to create a new web widget.
     * @param {Array} [options.arguments] An array of { name, value } objects.
     * @param {Array} [options.hosts] Hostnames to whitelist.
     * @param {String} [options.name] The name of the web widget.
     * @param {String} [options.type] The type of web widget.
     * @returns {Promise} A Promise, when resolved, provides info of the newly created web widget.
     */
    createWidget(options) {
        return this._plug.post(_makeXmlString(options), utility.xmlRequestType)
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(webWidgetsModel));
    }

    /**
     * Delete a web widget.
     * @param {Number|String} [id] The id of the web widget to delete.
     * @returns {Promise} A Promise, when resolved, indicates the web widget is deleted.
     */
    deleteWidget(id) {
        const widgetId = utility.getResourceId(id);
        return this._plug.at(widgetId).delete()
            .catch((err) => Promise.reject(_errorParser(err)));
    }

    /**
     * Update a web widget.
     * @param {Number|String} [id] The id of the web widget to update.
     * @param {Object} [options] The data used to update the web widget.
     * @param {Array} [options.arguments] - An array of { name, value } objects.
     * @param {Array} [options.hosts] Hostnames to whitelist.
     * @param {String} [options.name] The name of the web widget.
     * @param {String} [options.type] The type of web widget.
     * @returns {Promise} A Promise, when resolved, provides info of the updated web widget.
     */
    updateWidget(id, options) {
        const widgetId = utility.getResourceId(id);
        return this._plug.at(widgetId).put(_makeXmlString(options), utility.xmlRequestType)
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(webWidgetsModel));
    }

    /**
     * Activate a web widget.
     * @param {Number|String} [id] The id of the web widget to activate.
     * @returns {Promise} A Promise, when resolved, provides info of the activated web widget.
     */
    activateWidget(id) {
        const widgetId = utility.getResourceId(id);
        return this._plug.at(widgetId, 'activate').put()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(webWidgetsModel));
    }

    /**
     * Deactivate a web widget.
     * @param {Number|String} [id] The id of the web widget to deactivate.
     * @returns {Promise} A Promise, when resolved, provides info of the deactivated web widget.
     */
    deactivateWidget(id) {
        const widgetId = utility.getResourceId(id);
        return this._plug.at(widgetId, 'deactivate').put()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(webWidgetsModel));
    }
}
