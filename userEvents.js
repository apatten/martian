/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Plug} from './lib/plug';
import {utility} from './lib/utility';
import {userActivityModel} from './models/userActivity.model';
import {eventListModel} from './models/eventList.model';
import {eventDetailModel} from './models/eventDetail.model';

/**
 * A class for fetching and managing events triggered by users.
 */
export class UserEvents {

    /**
     * Construct a new UserEvents object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings) {
        this.settings = settings;
        this.plug = new Plug(settings).at('@api', 'deki', 'events');
    }

    /**
     * Get the user activity.
     * @param {Number|String} userToken - A token that identifies the user from an event perspective.  It can be the user's numeric ID, username, or another system-defined token.
     * @returns {Promise.<userActivityModel>} - A Promise that, when resolved, yields a {@link userActivityModel} containing the user's activity events.
     */
    getActivity(userToken, params) {
        return this.plug.at('support-agent', userToken).withParams(params).get().then(userActivityModel.parse);
    }

    /**
     * Get the user's history events.
     * @param {Number|String} [userId='current'] - The user's numeric ID or username.
     * @returns {Promise.<eventListModel>} - A Promise that, when resolved, yields a {@link eventListModel} that contains the listing of the user's events.
     */
    getHistory(userId) {
        return this.plug.at('user-page', utility.getResourceId(userId, 'current')).get().then(eventListModel.parse);
    }

    /**
     * Get the details of a specific user event.
     * @param {Number|String} [userId='current'] - The user's numeric ID or username.
     * @param {String} detailId - The detail ID of the event.
     * @returns {Promise.<eventDetailModel>} - A Promise that, when resolved, yields a {@link eventDetailModel} that contains the event information.
     */
    getHistoryDetail(userId, detailId) {
        return this.plug.at('user-page', utility.getResourceId(userId, 'current'), detailId).get().then(eventDetailModel.parse);
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
}
