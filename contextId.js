import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { contextIdsModel } from './models/contextIds.model.js';
import { contextIdModel } from './models/contextId.model.js';
import { contextMapsModel } from './models/contextMaps.model.js';
import { contextMapModel } from './models/contextMap.model.js';

/**
 * A class to manage individual Context IDs.
 */
export class ContextDefinition {

    /**
     * Create a ContextDefinition.
     * @param {String} id - The ID of the context definition.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id, settings = new Settings()) {
        if(!id) {
            throw new Error('an ID must be supplied to create a new ContextDefinition');
        }
        this.id = id;
        this.plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'contexts', id);
    }

    /**
     * Get the Context ID information from the API.
     * @returns {Promise.<contextIdModel>} - A promise that, when resolved, yields a {@link contextIdModel} object.
     */
    getInfo() {
        let contextIdParser = modelParser.createParser(contextIdModel);
        return this.plug.get().then((r) => r.json()).then(contextIdParser);
    }

    /**
     * Set or overwrite the description of the Context ID
     * @param {String} description - The new
     * @returns {Promise.<contextIdModel>} - A promise that, when resolved, yields a contextIdModel object.
     */
    updateDescription(description = '') {
        let contextIdParser = modelParser.createParser(contextIdModel);
        let updateRequest = `<context><id>${this.id}</id><description>${description}</description></context>`;
        return this.plug.put(updateRequest, 'application/xml; charset=utf-8').then((r) => r.json()).then(contextIdParser);
    }

    /**
     * Remove this Context ID from the system.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful deletion of the Context ID.
     */
    delete() {
        return this.plug.delete();
    }
}

/**
 * A class to manage a mapping between a {@link ContextDefinition} and a page on a MindTouch site; taking language into account.
 */
export class ContextMap {

    /**
     * Construct a new ContextMap
     * @param {String} language - The language of the mapping.
     * @param {String} id - The ID of the associated {@link ContextDefinition}.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(language, id, settings = new Settings()) {
        if(!id || !language) {
            throw new Error('an ID and language must be supplied to create a new ContextMap');
        }
        this.id = id;
        this.language = language;
        this.plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'contextmaps', language, id).withParam('verbose', 'true');
    }

    /**
     * Gets the information for the Context Mapping.
     * @returns {Promise.<contextMapModel>} - A promise that, when resolved, yields a {@link contextMapModel} object.
     */
    getInfo() {
        let contextMapParser = modelParser.createParser(contextMapModel);
        return this.plug.get().then((r) => r.json()).then(contextMapParser);
    }

    /**
     * Sets or changes the page ID for the Context ID mapping.
     * @param {Number} pageId - The page ID to use for the Context ID mapping.
     * @returns {Promise.<contextMapModel>} - A promise that, when resolved, yields a {@link contextMapModel} object.
     */
    update(pageId) {
        if(!pageId) {
            return Promise.reject(new Error('a page ID must be supplied in order to update a mapping'));
        }
        let contextMapParser = modelParser.createParser(contextMapModel);
        let updateRequest = `<contextmap><id>${this.id}</id><pageid>${pageId}</pageid><language>${this.language}</language></contextmap>`;
        return this.plug.put(updateRequest, 'application/xml; charset=utf-8').then((r) => r.json()).then(contextMapParser);
    }

    /**
     * Removes a mapping between a Context ID and an associated page.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful removal of the mapping.
     */
    remove() {
        return this.plug.delete();
    }
}

/**
 * A class to manage the Context ID subsystem for access to the Context IDs and Context ID Mappings.
 */
export class ContextIdManager {

    /**
     * Construct a new ContextIdManager.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this.mapsPlug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'contextmaps').withParam('verbose', 'true');
        this.definitionsPlug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'contexts');
        this._settings = settings;
    }

    /**
     * Get all of the Context ID Mappings that are defined.
     * @returns {Promise.<contextMapsModel>} - A promise that, when resolved, yields a {@link contextMapsModel} object.
     */
    getMaps() {
        let contextMapsParser = modelParser.createParser(contextMapsModel);
        return this.mapsPlug.get().then((r) => r.json()).then(contextMapsParser);
    }

    /**
     * Get all of the Context ID Definitions that are defined.
     * @returns {Promise.<contextIdsModel>} - A promise that, when resolved, yields a {@link contextIdsModel} object.
     */
    getDefinitions() {
        let contextIdsParser = modelParser.createParser(contextIdsModel);
        return this.definitionsPlug.get().then((r) => r.json()).then((response) => {

            // response is an empty string when site has no context IDs.
            if(response === '') {
                response = { context: [] };
            }
            return response;
        }).then(contextIdsParser);
    }

    /**
     * Add a new Context ID Definition to the system.
     * @param {String} id - The ID to use for the new definition.
     * @param {String} [description=''] - The initial description to set for the definition.
     * @returns {Promise.<contextIdModel>} - A promise that, when resolved, yields a {@link contextIdModel} object.
     */
    addDefinition(id, description = '') {
        if(!id) {
            return Promise.reject(new Error('an ID must be supplied to add a definition'));
        }
        let contextIdParser = modelParser.createParser(contextIdModel);
        let addRequest = `<contexts><context><id>${id}</id><description>${description}</description></context></contexts>`;
        return this.definitionsPlug.post(addRequest, 'application/xml; charset=utf-8').then((r) => r.json()).then(contextIdParser);
    }

    /**
     * Get a new {@link ContextDefinition} object for the supplied ID.
     * @param {String} id - The ID of the Context Definition to create.
     * @returns {ContextDefinition} - A new {@link ContextDefinition} object.
     */
    getDefinition(id) {
        return new ContextDefinition(id, this._settings);
    }

    /**
     * Get a new {@link ContextMap} object for the supplied language and ID combination.
     * @param {String} language - The language code to use to identify the mapping.
     * @param {String} id - The Context ID identifier to use to identify the mapping.
     * @returns {ContextMap} - A new {@link ContextMap} object.
     */
    getMap(language, id) {
        return new ContextMap(language, id, this._settings);
    }
}
