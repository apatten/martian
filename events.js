import { Plug } from '/mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { apiErrorModel } from './models/apiError.model.js';
import { userActivityModel } from './models/userActivity.model.js';
import { pageHistoryModel } from './models/pageHistory.model.js';
import { pageHistoryDetailModel } from './models/pageHistoryDetail.model.js';
import { reportLogsModel } from './models/reportLogs.model.js';
import { logUrlModel } from './models/logUrl.model.js';

const _errorParser = modelParser.createParser(apiErrorModel);

/**
 * A class for fetching and managing events.
 */
export class Events {

    /**
     * Construct a new Events object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'events');
    }

    /**
     * Get the available drafts history logs.
     * @returns {Promise.<reportLogsModel>} - A Promise that, when resolved, yields a {@link reportLogsModel} containing the available logs for drafts history.
     */
    getSiteDraftsHistoryLogs() {
        return this._plug.at('draft-hierarchy', 'logs').get()
            .then((r) => r.json()).then(modelParser.createParser(reportLogsModel));
    }

    /**
     * Get the draft history log url.
     * @param {String} logName - Name of log to retrive URL from.
     * @returns {Promise.<logUrlModel>} - A Promise that, when resolved, yields a {@link logUrlModel} containing log url.
     */
    getSiteDraftsHistoryLogUrl(logName) {
        if(!logName) {
            return Promise.reject(new Error('Attempting to get log url without required name'));
        }
        return this._plug.at('draft-hierarchy', 'logs', logName, 'url').get()
            .then((r) => r.json()).then(modelParser.createParser(logUrlModel));
    }

    /**
     * Get the drafts history
     * @param {Object} [options] - An object that directs the history fetching.
     * @param {String|Number} [options.pageId=home] - The page in the site hierarchy to return the history.
     * @param {Number} [options.limit=25] - The maximum number results to retrieve. Regardless of what is passed in, no more than 1000 results will be returned.
     * @param {String} [options.upTo] - The history event ID to start fetching at.
     * @param {Array} [options.include] - An array of entity details to include. Valid entries are 'page', 'user', 'group', 'file', and 'request'
     * @returns {Promise.<pageHistoryModel|Error>} - A Promise that will be resolved with the page history data, or rejected with an error specifying the reason for rejection.
     */
    getSiteDraftsHistory(options = {}) {
        const params = {};
        if(options.limit) {
            if(typeof options.limit !== 'number') {
                return Promise.reject(new Error('The `limit` parameter must be a number less than or equal to 1000.'));
            }
            params.limit = options.limit;
        }
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        if(options.upTo) {
            if(typeof options.upTo !== 'string') {
                return Promise.reject(new Error('The `upTo` parameter must be a string.'));
            }
            params.upto = options.upTo;
        }
        return this._plug.at('draft-hierarchy', utility.getResourceId(options.pageId, 'home')).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Get the detail of a site history event
     * @param {String} detailId - The GUID specifying the detail to fetch.
     * @param {Object} [options] - Information about the detail to fetch
     * @param {Array} [options.include] - An array of entity details to include. Valid entries are 'page', 'user', 'group', 'file', and 'request'
     * @returns {Promise.<pageHistoryModel|Error>} - A Promise that will be resolved with the page history data, or rejected with an error specifying the reason for rejection.
     */
    getSiteDraftsHistoryDetail(detailId, options = {}) {
        if(!detailId || typeof detailId !== 'string') {
            return Promise.reject(new Error('The detail ID must be specified, and it must be a string.'));
        }
        const params = {};
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` option must be an array'));
            }
            params.include = options.include.join(',');
        }
        return this._plug.at('draft-hierarchy', 'details', options.detailId).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Get draft history summary.
     * @param {Number|String} [pageId=home] - The page ID or path.
     * @param {Object} [options] - An object that directs the history fetching.
     * @param {Number} [options.limit=25] - The maximum number results to retrieve. Regardless of what is passed in, no more than 1000 results will be returned.
     * @param {String} [options.upTo] - The history event ID to start fetching at.
     * @param {Array} [options.include] - An array of entity details to include. Valid entries are 'page', 'user', 'group', 'file', and 'request'
     * @returns {Promise.<pageHistoryModel>} - A Promise that, when resolved, yields a {@link pageHistoryModel} that contains the listing of the page events.
     */
    getDraftHistory(pageId = 'home', options = {}) {
        const params = {};
        if(options.limit) {
            if(typeof options.limit !== 'number') {
                return Promise.reject(new Error('The `limit` parameter must be a number.'));
            }
            params.limit = options.limit;
        }
        if(options.upTo) {
            if(typeof options.upTo !== 'string') {
                return Promise.reject(new Error('The `upTo` parameter must be a string.'));
            }
            params.upto = options.upTo;
        }
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        return this._plug.at('draft', utility.getResourceId(pageId, 'home')).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Get draft history detail.
     * @param {Number|String} pageId = 'home' - The page ID or path.
     * @param {String} detailId - The detail ID.
     * @param {Object} [options] - Options to direct the fetching of the detail.
     * @param {Array} [options.include] - An array of strings identifying elements to expand in the result. Valid identifiers are: 'page', 'user', 'file', and 'request'.
     * @returns {Promise.<pageHistoryModel>} - A Promise that, when resolved, yields a {@link pageHistoryModel} that contains the listing of the page events.
     */
    getDraftHistoryDetail(pageId, detailId, options = {}) {
        if(!pageId) {
            return Promise.reject(new Error('The page ID is required to fetch a draft history detail.'));
        }
        if(!detailId) {
            return Promise.reject(new Error('The detail ID is required to fetch a draft history detail.'));
        }
        const params = {};
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        return this._plug.at('draft', utility.getResourceId(pageId, 'home'), detailId).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryDetailModel));
    }

    /**
     * Get the history summary for a Learning Path
     * @param {String} learningPathId - The string identifier of the learning path.
     * @param {Object} [options] - Options to direct the fetching of the learning path history.
     * @param {Number} [options.limit=25] - The maximum number of results to fetch.
     * @param {String} [options.upTo] - The GUID identifier to use for paging.
     * @param {Array} [options.include] - An array of strings identifying elements to expand in the result. Valid identifiers are: 'page', 'user', 'file', and 'request'.
     * @returns {Promise.<Object|Error>} - A Promise that will be resolved with the learning path history data, or rejected with an error specifying the reason for rejection.
     */
    getLearningPathHistory(learningPathId, options = {}) {
        if(!learningPathId || typeof learningPathId !== 'string') {
            return Promise.reject(new Error('The learning path ID must be supplied, and must be a string'));
        }
        const params = {};
        if(options.limit) {
            if(typeof options.limit !== 'number') {
                return Promise.reject(new Error('The `limit` parameter must be a number.'));
            }
            params.limit = options.limit;
        }
        if(options.upTo) {
            if(typeof options.upTo !== 'string') {
                return Promise.reject(new Error('The `upTo` parameter must be a string.'));
            }
            params.upto = options.upTo;
        }
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        return this._plug.at('learningpath', utility.getResourceId(learningPathId)).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Get the available site history logs.
     * @param {String} No params necessary.
     * @returns {Promise.<reportLogsModel>} - A Promise that, when resolved, yields a {@link reportLogsModel} containing the available logs for site history.
     */
    getSiteHistoryLogs() {
        return this._plug.at('page-hierarchy', 'logs').get()
            .then((r) => r.json()).then(modelParser.createParser(reportLogsModel));
    }

    /**
     * Get the site history log url.
     * @param {String} logName - Name of log to retrive URL from.
     * @returns {Promise.<logUrlModel>} - A Promise that, when resolved, yields a {@link logUrlModel} containing log url.
     */
    getSiteHistoryLogUrl(logName) {
        if(!logName) {
            return Promise.reject(new Error('Attempting to get log url without required name'));
        }
        return this._plug.at('page-hierarchy', 'logs', logName, 'url').get()
            .then((r) => r.json()).then(modelParser.createParser(logUrlModel));
    }

    /**
     * Get site history summary
     * @param {Object} [options] - An object that directs the history fetching.
     * @param {String|Number} [options.pageId=home] - The page in the site hierarchy to return the history.
     * @param {Number} [options.limit=25] - The maximum number results to retrieve. Regardless of what is passed in, no more than 1000 results will be returned.
     * @param {String} [options.upTo] - The history event ID to start fetching at.
     * @param {Array} [options.include] - An array of entity details to include. Valid entries are 'page', 'user', 'group', 'file', and 'request'
     * @returns {Promise.<pageHistoryModel|Error>} - A Promise that will be resolved with the site history data, or rejected with an error specifying the reason for rejection.
     */
    getSiteHistory(options = {}) {
        const params = {};
        if(options.limit) {
            if(typeof options.limit !== 'number') {
                return Promise.reject(new Error('The `limit` parameter must be a number less than or equal to 1000.'));
            }
            params.limit = options.limit;
        }
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        if(options.upTo) {
            if(typeof options.upTo !== 'string') {
                return Promise.reject(new Error('The `upTo` parameter must be a string.'));
            }
            params.upto = options.upTo;
        }
        return this._plug.at('page-hierarchy', utility.getResourceId(options.pageId, 'home')).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Get the detail of a site history event
     * @param {String} detailId - The GUID specifying the detail to fetch.
     * @param {Object} [options] - Information about the detail to fetch
     * @param {Array} [options.include] - An array of entity details to include. Valid entries are 'page', 'user', 'group', 'file', and 'request'
     * @returns {Promise.<pageHistoryModel|Error>} - A Promise that will be resolved with the site history detail data, or rejected with an error specifying the reason for rejection.
     */
    getSiteHistoryDetail(detailId, options = {}) {
        if(!detailId || typeof detailId !== 'string') {
            return Promise.reject(new Error('The detail ID must be specified, and it must be a string.'));
        }
        const params = {};
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` option must be an array'));
            }
            params.include = options.include.join(',');
        }
        return this._plug.at('page-hierarchy', 'details', detailId).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Notify the system that a page was viewed by a user
     * @param {String|Number} pageId - The numeric ID or path of the page to log a view event for.
     * @param {Object} [eventData] - Specific data about the search that was performed.
     * @returns {Promise.<pageHistoryModel|Error>} - A Promise that will be resolved, or rejected with an error specifying the reason for rejection.
     */
    logPageView(pageId, eventData = {}) {
        return this._plug.at('page-view', utility.getResourceId(pageId, 'home')).post(JSON.stringify(eventData), utility.jsonRequestType);
    }

    /**
     * Get page history summary.
     * @param {Number|String} [pageId=home] - The page ID or path.
     * @param {Object} [options] - An object that directs the history fetching.
     * @param {Number} [options.limit=25] - The maximum number results to retrieve. Regardless of what is passed in, no more than 1000 results will be returned.
     * @param {String} [options.upTo] - The history event ID to start fetching at.
     * @param {Array} [options.include] - An array of entity details to include. Valid entries are 'page', 'user', 'group', 'file', and 'request'
     * @returns {Promise.<pageHistoryModel>} - A Promise that, when resolved, yields a {@link pageHistoryModel} that contains the listing of the page events.
     */
    getPageHistory(pageId = 'home', options = {}) {
        const params = {};
        if(options.limit) {
            if(typeof options.limit !== 'number') {
                return Promise.reject(new Error('The `limit` parameter must be a number less than or equal to 1000.'));
            }
            params.limit = options.limit;
        }
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        if(options.upTo) {
            if(typeof options.upTo !== 'string') {
                return Promise.reject(new Error('The `upTo` parameter must be a string.'));
            }
            params.upto = options.upTo;
        }
        return this._plug.at('page', utility.getResourceId(pageId, 'home')).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Get page history detail.
     * @param {Number|String} pageId = 'home' - The page ID or path.
     * @param {String} detailId - The detail ID.
     * @param {Object} [options] - Options to direct the fetching of the detail.
     * @param {Array} [options.include] - An array of strings identifying elements to expand in the result. Valid identifiers are: 'page', 'user', 'file', and 'request'.
     * @returns {Promise.<pageHistoryModel>} - A Promise that, when resolved, yields a {@link pageHistoryDetailModel} that contains the listing of the page events.
     */
    getPageHistoryDetail(pageId, detailId, options = {}) {
        if(!pageId) {
            return Promise.reject(new Error('The page ID is required to fetch a page history detail.'));
        }
        if(!detailId) {
            return Promise.reject(new Error('The detail ID is required to fetch a page history detail.'));
        }
        const params = {};
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        return this._plug.at('page', utility.getResourceId(pageId, 'home'), detailId).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryDetailModel));
    }

    /**
     * Log a search event that is performed by a specific user.
     * @param {Number|String} [userId=current] - The user's numeric ID or username.
     * @param {Object} [eventData] - Specific data about the search that was performed.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful posting of the search event.
     */
    logSearch(userId, eventData) {
        return this._plug.at('search', utility.getResourceId(userId, 'current')).post(JSON.stringify(eventData), utility.jsonRequestType);
    }

    /**
     * Get the available user activity logs.
     * @returns {Promise.<reportLogsModel>} - A Promise that, when resolved, yields a {@link reportLogsModel} containing the available logs for user activity.
     */
    getUserActivityLogs() {
        return this._plug.at('support-agent', 'logs').get()
            .then((r) => r.json()).then(modelParser.createParser(reportLogsModel));
    }

    /**
     * Get the user activity log url.
     * @param {String} logName - Name of log to retrive URL from.
     * @returns {Promise.<logUrlModel>} - A Promise that, when resolved, yields a {@link logUrlModel} containing log url.
     */
    getUserActivityLogUrl(logName) {
        if(!logName) {
            return Promise.reject(new Error('Attempting to get log url without required name'));
        }
        return this._plug.at('support-agent', 'logs', logName, 'url').get()
            .then((r) => r.json()).then(modelParser.createParser(logUrlModel));
    }

    /**
     * Get the user activity.
     * @param {Number|String} userActivityToken - A token that identifies the user from an user activity perspective. It can be the user's numeric ID, username, or another system-defined token.
     * @param {Object} [options] - Additional information to direct the activity fetching.
     * @param {Number} [options.limit=10] - The maximum number results to retrieve.
     * @param {Array} [options.include] - An array of strings identifying elements to expand in the result. Valid identifiers are: 'user', 'page', and 'request'.
     * @param {String|Date} [options.upTo] - The marker used to paginate.
     * @returns {Promise.<userActivityModel>} - A Promise that, when resolved, yields a {@link userActivityModel} containing the user's activity events.
     */
    getUserActivity(userActivityToken, options = {}) {
        if(!userActivityToken) {
            return Promise.reject(new Error('The user activity token must be supplied'));
        }
        let token;
        try {
            token = utility.getNormalizedUserActivityToken(userActivityToken);
        } catch(e) {
            return Promise.reject(e);
        }
        const params = {};
        if(options.limit) {
            if(typeof options.limit !== 'number') {
                return Promise.reject(new Error('The `limit` parameter must be a number.'));
            }
            params.limit = options.limit;
        }
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        if(options.upTo) {
            if(typeof options.upTo !== 'string' && !(options.upTo instanceof Date)) {
                return Promise.reject(new Error('The `upTo` parameter must be a string or a Date.'));
            }
            if(options.upTo instanceof Date) {
                params.upto = utility.getApiDateString(options.upTo);
            } else {
                params.upto = options.upTo;
            }
        }
        return this._plug.at('support-agent', token).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(userActivityModel));
    }

    /**
     * Get the user's history events.
     * @param {Number|String} [userId=current] - The user's numeric ID or username.
     * @param {Object} [options] - Additional options to direct the history fetching.
     * @param {Number} [options.limit=10] - The maximum number results that we want to retrieve.
     * @param {Array} [options.include] - An array of elements you'd like to expand. If specified, valid entries are 'user', 'page', and 'request'.
     * @param {String|Date} [options.upTo] - The marker used to paginate.
     * @returns {Promise.<pageHistoryModel>} - A Promise that, when resolved, yields a {@link pageHistoryModel} that contains the listing of the user's events.
     */
    getUserHistory(userId = 'current', options = {}) {
        const params = {};
        if(options.limit) {
            if(typeof options.limit !== 'number') {
                return Promise.reject(new Error('The `limit` parameter must be a number.'));
            }
            params.limit = options.limit;
        }
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        if(options.upTo) {
            if(typeof options.upTo !== 'string' && !(options.upTo instanceof Date)) {
                return Promise.reject(new Error('The `upTo` parameter must be a string or a Date.'));
            }
            if(options.upTo instanceof Date) {
                params.upto = utility.getApiDateString(options.upTo);
            } else {
                params.upto = options.upTo;
            }
        }
        return this._plug.at('user-page', utility.getResourceId(userId, 'current')).withParams(params).get()
            .catch((e) => Promise.reject(_errorParser(e)))
            .then((r) => r.json())
            .then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Get the details of a specific user event.
     * @param {String} detailId - The detail ID of the event.
     * @param {Object} [options] - Information to direct the detail to fetch.
     * @param {Array} [options.include] - An array of strings identifying elements to expand in the result. Valid identifiers are: 'page', 'user', 'file', and 'request'.
     * @returns {Promise.<pageHistoryModel>} - A Promise that, when resolved, yields a {@link pageHistoryModel} that contains the event information.
     */
    getUserHistoryDetail(detailId, options = {}) {
        if(!detailId) {
            return Promise.reject(new Error('The detail ID must be supplied'));
        }
        const params = {};
        if(options.include) {
            if(!Array.isArray(options.include)) {
                return Promise.reject(new Error('The `include` parameter must be an array.'));
            }
            params.include = options.include.join(',');
        }
        return this._plug.at('user-page', 'current', detailId).withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Log a web widget impression event. This request will fail if not called from a MindTouch web widget.
     * @returns {Promise} - A Promise that, when resolved, contains the status of the web widget impression request.
     */
    logWebWidgetImpression() {
        return this._plug.at('web-widget-impression').post();
    }
}
