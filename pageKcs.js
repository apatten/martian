import { Plug } from './plug.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { utility } from './lib/utility.js';
import { kcsTransitionsModel } from './models/kcsTransitions.model.js';
import { kcsStateModel } from './models/kcsState.model.js';
import { apiErrorModel } from './models/apiError.model.js';

const _errorParser = modelParser.createParser(apiErrorModel);

/**
 * A class for handling KCS actions
 */
export class PageKcs {
    /**
     * Construct a Kcs object
     * @param {Number|String} pageid The ID of the page to request the current KCS state for.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(pageid, settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages', pageid, 'kcs');
    }

    /**
     * Retrieves the current KCS state of a page
     * @returns {Promise} A Promise that, when resolved, yields a kcsStateModel.
     */
    getState() {
        return this._plug
            .at('state')
            .get()
            .catch(err => Promise.reject(_errorParser(err)))
            .then(r => r.json())
            .then(modelParser.createParser(kcsStateModel));
    }

    /**
     * Retrieves a list of allowed KCS transitions for a page
     * @returns {Promise} A Promise that, when resolved, yields a kcsTransitionsModel with a list of allowed KCS transitions.
     */
    getValidTransitions() {
        return this._plug
            .at('validtransitions')
            .get()
            .catch(err => Promise.reject(_errorParser(err)))
            .then(r => r.json())
            .then(modelParser.createParser(kcsTransitionsModel));
    }

    /**
     * Posts KCS state for given page
     * @param {Object} state The state that the page should be set to. Must include at least one of the following attributes.
     * @param {String} [state.confidence] The confidence level to set the page to.
     * @param {String} [state.visibility] The visibility level to set the page to.
     * @param {Boolean} [state.flag] The flag state to set the page to.
     * @returns {Promise} A Promise that is resolved, or rejected with an error specifying the reason for rejection.
     */
    setState(state) {
        if (state && Object.keys(state).length === 0) {
            return Promise.reject('A state must be specified for request.');
        }
        return this._plug
            .at('state')
            .withParams()
            .post(JSON.stringify(state), utility.jsonRequestType)
            .catch(err => Promise.reject(_errorParser(err)));
    }

    /**
     * Posts KCS flagging state for given page
     * @param {Object} flag The state that the page should be set to. Must include at least one of the following attributes.
     * @param {Boolean} [flag.state] The flag state to set the page to.
     * @param {String} [flag.details] Details about the state of the flag. Required when flag is set to true.
     * @returns {Promise} A Promise that is resolved, or rejected with an error specifying the reason for rejection.
     */
    setFlag(flag) {
        if (typeof flag.state === 'undefined') {
            return Promise.reject('A flagged state must be specified for request.');
        }
        if (flag.state === true && typeof flag.details === 'undefined') {
            return Promise.reject('Details must be specified for request when the flagged state is set to true.');
        }
        return this._plug
            .at('flag')
            .withParams()
            .post(
                JSON.stringify({
                    flag: flag.state,
                    flag_details: flag.details // eslint-disable-line camelcase
                }),
                utility.jsonRequestType
            )
            .catch(err => Promise.reject(_errorParser(err)));
    }

    /**
     * Initialize KCS state for given page
     * @returns {Promise} A Promise that is resolved, or rejected with an error specifying the reason for rejection.
     */
    initialize() {
        return this._plug
            .at('initialize')
            .post(utility.jsonRequestType)
            .catch(err => Promise.reject(_errorParser(err)));
    }
}
