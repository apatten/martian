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
import {stringUtility} from './lib/stringUtility';
import {pageRatingsModel} from './models/pageRatings.model';

/**
 * A class to manage the page feedback and ratings for pages.
 */
export class FeedbackManager {

    /**
     * Construct a new FeedbackManager.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings) {
        this.plug = new Plug(settings).at('@api', 'deki');
    }

    /**
     * Submit feedback for a page.
     * @param {Object} options - Parameters to send along with the feedback.
     * @param {String} options.userEmail - The email of the user sending feedback.
     * @param {String} options.pageTitle - The display title of the page the feedback is in reference to.
     * @param {String} options.siteUrl - The URL of the MindTouch site.
     * @param {String} options.content - The body text ofd the feedback message input by the user.
     * @param {Boolean} options.contactAllowed - Notifies the API whether or not the user grants permission to contact them.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful feedback submission.
     */
    submit(options) {
        let path = options.path || stringUtility.leftTrim(window.location.pathname, '/');
        let request = JSON.stringify({
            _path: encodeURIComponent(path),
            userEmail: options.userEmail,
            pageTitle: options.pageTitle,
            siteUrl: options.siteUrl,
            content: options.content,
            contactAllowed: options.contactAllowed
        });
        let plug = this.plug.at('workflow', 'submit-feedback');
        return plug.post(request, utility.jsonRequestType);
    }

    /**
     * Get the ratings that have been set for a series of pages.
     * @param {Array} pageIds - The list of pages for which ratings data is fetched.
     * @returns {Promise.<pageRatingsModel>} - A Promise that, when resolved, yields a {@link pageRatingsModel} object with the ratings information.
     */
    getRatingsForPages(pageIds) {
        var ratingsPlug = this.plug.at('pages', 'ratings').withParams({ pageids: pageIds.join(',') });
        return ratingsPlug.get().then(pageRatingsModel.parse);
    }
}
