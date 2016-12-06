import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { userActivityModel } from './models/userActivity.model.js';
import { userHistoryModel } from './models/userHistory.model.js';
import { userHistoryDetailModel } from './models/userHistoryDetail.model.js';
import { pageHistoryModel } from './models/pageHistory.model.js';
import { pageHistoryDetailModel } from './models/pageHistoryDetail.model.js';

/**
 * A class for fetching and managing events.
 */
export class Events {

    /**
     * Construct a new Events object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this.settings = settings;
        this.plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'events');
    }

    /**
     * Get the available user activity logs.
     * @param {String} No params necessary.
     * @returns {Promise.<availableLogsModel>} - A Promise that, when resolved, yields a {@link availableLogsModel} containing the available logs for user activity.
     */
    getAvailableUserActivityLogs() {
        return this.plug.at('support-agent', 'logs').get().then((r) => r.json()).then(modelParser.createParser(availableLogsModel));
    }

    /**
     * Get the available site history logs.
     * @param {String} No params necessary.
     * @returns {Promise.<availableLogsModel>} - A Promise that, when resolved, yields a {@link availableLogsModel} containing the available logs for site history.
     */
    getAvailableSiteHistoryLogs() {
        return this.plug.at('page-hierarchy', 'logs').get().then((r) => r.json()).then(modelParser.createParser(availableLogsModel));
    }

    /**
     * Get the available drafts history logs.
     * @param {String} No params necessary.
     * @returns {Promise.<availableLogsModel>} - A Promise that, when resolved, yields a {@link availableLogsModel} containing the available logs for drafts history.
     */
    getAvailableDraftsHistoryLogs() {
        return this.plug.at('draft-hierarchy', 'logs').get().then((r) => r.json()).then(modelParser.createParser(availableLogsModel));
    }

    /**
     * Get the draft history log url.
     * @param {String} logName - Name of log to retrive URL from.
     * @returns {Promise.<logUrlModel>} - A Promise that, when resolved, yields a {@link logUrlModel} containing log url.
     */
    getDraftHistoryLogUrl({logName = ''} = {}) {
        return this.plug.at('activity', 'logs', logName, 'url').withParams(params).get().then((r) => r.json()).then(modelParser.createParser(logUrlModel));
    }

    /**
     * Get the site history log url.
     * @param {String} logName - Name of log to retrive URL from.
     * @returns {Promise.<logUrlModel>} - A Promise that, when resolved, yields a {@link logUrlModel} containing log url.
     */
    getSiteHistoryLogUrl({logName = ''} = {}) {
        return this.plug.at('activity', 'logs', logName, 'url').withParams(params).get().then((r) => r.json()).then(modelParser.createParser(logUrlModel));
    }

    /**
     * Get the user activity log url.
     * @param {String} logName - Name of log to retrive URL from.
     * @returns {Promise.<logUrlModel>} - A Promise that, when resolved, yields a {@link logUrlModel} containing log url.
     */
    getUserActivityLogUrl({logName = ''} = {}) {
        return this.plug.at('activity', 'logs', logName, 'url').withParams(params).get().then((r) => r.json()).then(modelParser.createParser(logUrlModel));
    }

    /**
     * Get the user activity.
     * @param {Number|String} userActivityToken - A token that identifies the user from an user activity perspective. It can be the user's numeric ID, username, or another system-defined token.
     * @returns {Promise.<userActivityModel>} - A Promise that, when resolved, yields a {@link userActivityModel} containing the user's activity events.
     */
    getUserActivity(userActivityToken, params) {
        return this.plug.at('support-agent', utility.getNormalizedUserActivityToken(userActivityToken)).withParams(params).get().then((r) => r.json()).then(modelParser.createParser(userActivityModel));
    }

    /**
     * Get the user's history events.
     * @param {Number|String} [userId='current'] - The user's numeric ID or username.
     * @returns {Promise.<userHistoryModel>} - A Promise that, when resolved, yields a {@link userHistoryModel} that contains the listing of the user's events.
     */
    getUserHistory(userId) {
        return this.plug.at('user-page', utility.getResourceId(userId, 'current')).get().then((r) => r.json()).then(modelParser.createParser(userHistoryModel));
    }

    /**
     * Get the details of a specific user event.
     * @param {Number|String} [userId='current'] - The user's numeric ID or username.
     * @param {String} detailId - The detail ID of the event.
     * @returns {Promise.<userHistoryDetailModel>} - A Promise that, when resolved, yields a {@link userHistoryDetailModel} that contains the event information.
     */
    getUserHistoryDetail(userId, detailId) {
        return this.plug.at('user-page', utility.getResourceId(userId, 'current'), detailId).get().then((r) => r.json()).then(modelParser.createParser(userHistoryDetailModel));
    }

    /**
     * Get page history summary.
     * @param {Number|String} [id='home'] - The page ID or path.
     * @param {Object} params (limit, upto, include) - Optional.
     * @returns {Promise.<pageHistoryModel>} - A Promise that, when resolved, yields a {@link pageHistoryModel} that contains the listing of the page events.
     */
    getPageHistory(pageId, params) {
        return this.plug.at('page', utility.getResourceId(pageId, 'home')).withParams(params).get().then((r) => r.json()).then(modelParser.createParser(pageHistoryModel));
    }

    /**
     * Get page history detail.
     * @param {Number|String} pageId = 'home' - The page ID or path.
     * @param {String} detailId - The detail ID.
     * @param {Object} params (include) - Optional.
     * @returns {Promise.<pageHistoryModel>} - A Promise that, when resolved, yields a {@link pageHistoryModel} that contains the listing of the page events.
     */
    getPageHistoryDetail(pageId, detailId, params) {
        return this.plug.at('page', utility.getResourceId(pageId, 'home'), detailId).withParams(params).get().then((r) => r.json()).then(modelParser.createParser(pageHistoryDetailModel));
    }

    /**
     * Log a search event that is performed by a specific user.
     * @param {Number|String} [userId='current'] - The user's numeric ID or username.
     * @param {Object} eventData - Specific data about the search that was performed.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful posting of the search event.
     */
    logSearch(userId, eventData) {
        return this.plug.at('search', utility.getResourceId(userId, 'current')).post(JSON.stringify(eventData), utility.jsonRequestType);
    }

    /**
     * Log a web widget impression event. This request will fail if not called from a MindTouch web widget.
     * @returns {Promise} - A Promise that, when resolved, contains the status of the web widget impression request.
     */
    logWebWidgetImpression() {
        return this.plug.at('web-widget-impression').post();
    }
}
