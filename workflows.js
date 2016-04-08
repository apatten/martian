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
import { Plug } from './lib/plug';
import { stringUtility } from './lib/stringUtility';
import { utility } from './lib/utility';

/**
 * A class for working with site workflows.
 */
export class WorkflowManager {

    /**
     * Construct a new FeedbackManager.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings) {
        this._plug = new Plug(settings).at('@api', 'deki', 'workflow');
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
    submitFeedback(options) {
        let path = options.path || stringUtility.leftTrim(window.location.pathname, '/');
        let request = JSON.stringify({
            _path: encodeURIComponent(path),
            userEmail: options.userEmail,
            pageTitle: options.pageTitle,
            siteUrl: options.siteUrl,
            content: options.content,
            contactAllowed: options.contactAllowed
        });
        return this._plug.at('submit-feedback').post(request, utility.jsonRequestType);
    }

    /**
     * Send a message requesting an article be created on the site.
     * @param {Object} options - Parameters to send along with the request. These parameters are specific to the corresponding integration configuration on the MindTouch site.
     */
    requestArticle(options) {
        let request = JSON.stringify(options);
        return this._plug.at('submit-article-request').post(request, utility.jsonRequestType);
    }

    /**
     * Send a message that submits a support issue.
     * @param {Object} options - Parameters to send along with the request. These parameters are specific to the corresponding integration configuration on the MindTouch site.
     */
    submitIssue(options) {
        let request = JSON.stringify(options);
        return this._plug.at('submit-issue').post(request, utility.jsonRequestType);
    }

    /**
     * Send a message to site support.
     * @param {Object} options - Parameters to send along with the request. These parameters are specific to the corresponding integration configuration on the MindTouch site.
     */
    contactSupport(options) {
        let request = JSON.stringify(options);
        return this._plug.at('contact-support').post(request, utility.jsonRequestType);
    }
}
