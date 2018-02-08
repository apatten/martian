import { Plug } from '/mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { developerTokensModel, developerTokenModel } from './models/developerTokens.model.js';
import { apiErrorModel } from './models/apiError.model.js';

const _errorParser = modelParser.createParser(apiErrorModel);

/**
 * A class for managing a site's developer tokens.
 */
export class DeveloperTokenManager {
    /**
     * Construct a new DeveloperTokenManager object.
     * @param {Settings} settings The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'site', 'developer-tokens');
    }

    /**
     * Get a listing of all of the developer tokens currently defined on the site.
     * @returns {Promise} A Promise that, when resolved, yields a developerTokensModel representing the listing of the site's developer tokens.
     */
    getTokens() {
        return this._plug
            .get()
            .then(r => r.json())
            .then(modelParser.createParser(developerTokensModel));
    }

    /**
     * Add a new developer token for use with the site.
     * @param {Object} options Options to direct the creation of the token.
     * @param {String} name The name of the token to create.
     * @param {String} [host] The hostname to associate with a 'browser' developer token. If omitted, a 'server' token will be created.
     * @returns {Promise} A Promise that, when resolved, yields a developerTokenModel contiaining the information about the new token.
     */
    addToken({ name, host } = {}) {
        if (!name) {
            return Promise.reject(new Error('The name must be supplied when adding a new developer token'));
        }
        let requestXml = `<developer-token><name>${name}</name>`;
        if (host) {
            requestXml += `<host>${host}</host>`;
        }
        requestXml += '</developer-token>';
        return this._plug
            .post(requestXml, utility.xmlRequestType)
            .then(r => r.json())
            .catch(err => Promise.reject(_errorParser(err)))
            .then(modelParser.createParser(developerTokenModel));
    }
}

export class DeveloperToken {
    /**
     * Construct a new DeveloperToken instance.
     * @param {Number} id The numeric ID of the developer token.
     * @param {Settings} settings The {@see Settings} used to direct the API calls.
     */
    constructor(id, settings = new Settings()) {
        if (!id) {
            throw new Error('The id must be supplied to create a new DeveloperToken instance');
        }
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'site', 'developer-tokens', id);
    }

    /**
     * Delete the token from the site.
     * @returns {Promise} A Promise that, when resolved, indicates a successufl deletion of the token.
     */
    delete() {
        return this._plug.delete().catch(err => Promise.reject(_errorParser(err)));
    }
}
