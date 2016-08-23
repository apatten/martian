import { Plug } from 'mindtouch-http';
import { Settings } from './lib/settings';
import { utility } from './lib/utility';
import { modelParser } from './lib/modelParser';
import { userActivityModel } from './models/userActivity.model';
import { eventListModel } from './models/eventList.model';
import { eventDetailModel } from './models/eventDetail.model';

/**
 * A class for fetching and managing events triggered by users.
 */
export class UserEvents {

    /**
     * Construct a new UserEvents object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this.settings = settings;
        this.plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'events');
    }

    /**
     * Get the user activity.
     * @param {Number|String} userActivityToken - A token that identifies the user from an user activity perspective. It can be the user's numeric ID, username, or another system-defined token.
     * @returns {Promise.<userActivityModel>} - A Promise that, when resolved, yields a {@link userActivityModel} containing the user's activity events.
     */
    getActivity(userActivityToken, params) {
        const token = utility.getNormalizedUserActivityToken(userActivityToken);
        const userActivityModelParser = modelParser.createParser(userActivityModel);
        return this.plug.at('support-agent', token).withParams(params).get().then((r) => r.json()).then(userActivityModelParser);
    }

    /**
     * Get the user's history events.
     * @param {Number|String} [userId='current'] - The user's numeric ID or username.
     * @returns {Promise.<eventListModel>} - A Promise that, when resolved, yields a {@link eventListModel} that contains the listing of the user's events.
     */
    getHistory(userId) {
        const eventListModelParser = modelParser.createParser(eventListModel);
        return this.plug.at('user-page', utility.getResourceId(userId, 'current')).get().then((r) => r.json()).then(eventListModelParser);
    }

    /**
     * Get the details of a specific user event.
     * @param {Number|String} [userId='current'] - The user's numeric ID or username.
     * @param {String} detailId - The detail ID of the event.
     * @returns {Promise.<eventDetailModel>} - A Promise that, when resolved, yields a {@link eventDetailModel} that contains the event information.
     */
    getHistoryDetail(userId, detailId) {
        const eventDetailModelParser = modelParser.createParser(eventDetailModel);
        return this.plug.at('user-page', utility.getResourceId(userId, 'current'), detailId).get().then((r) => r.json()).then(eventDetailModelParser);
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
