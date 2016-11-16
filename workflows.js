import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { workflowsModel } from './models/workflows.model.js';

/**
 * A class for working with site workflows.
 */
export class WorkflowManager {

    /**
     * Construct a new FeedbackManager.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'workflow');
    }

    /**
     * Submit feedback for a page.
     * @param {Object} options - Parameters to send along with the feedback.
     * @param {String} options.userEmail - The email of the user sending feedback.
     * @param {String} options.pageTitle - The display title of the page the feedback is in reference to.
     * @param {String} options.siteUrl - The URL of the MindTouch site.
     * @param {String} options.content - The body text of the feedback message input by the user.
     * @param {Boolean} options.contactAllowed - Notifies the API whether or not the user grants permission to contact them.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful feedback submission.
     */
    submitFeedback(options = {}) {
        const workflowPath = 'submit-feedback';
        if(!('_path' in options)) {
            return Promise.reject(new Error(`The _path field must be supplied for ${workflowPath}`));
        }
        const request = JSON.stringify({
            _path: options._path,
            userEmail: options.userEmail,
            pageTitle: options.pageTitle,
            siteUrl: options.siteUrl,
            content: options.content,
            contactAllowed: options.contactAllowed
        });
        return this._plug.at(workflowPath).post(request, utility.jsonRequestType).then((r) => r.json()).then(modelParser.createParser(workflowsModel));
    }

    /**
     * Send a message requesting an article be created on the site.
     * @param {Object} options - Parameters to send along with the request. These parameters are specific to the corresponding integration configuration on the MindTouch site.
     */
    requestArticle(options = {}) {
        return this._plug.at('submit-article-request').post(JSON.stringify(options), utility.jsonRequestType).then((r) => r.json()).then(modelParser.createParser(workflowsModel));
    }

    /**
     * Send a message that submits a support issue.
     * @param {Object} options - Parameters to send along with the request. These parameters are specific to the corresponding integration configuration on the MindTouch site.
     */
    submitIssue(options = {}) {
        const workflowPath = 'submit-issue';
        if(!('_path' in options) || !('_search' in options)) {
            return Promise.reject(new Error('The _path and _search fields must be supplied for ${workflowPath}'));
        }
        return this._plug.at(workflowPath).post(JSON.stringify(options), utility.jsonRequestType).then((r) => r.json()).then(modelParser.createParser(workflowsModel));
    }

    /**
     * Send a message to site support.
     * @param {Object} options - Parameters to send along with the request. These parameters are specific to the corresponding integration configuration on the MindTouch site.
     */
    contactSupport(options = {}) {
        const workflowPath = 'contact-support';
        if(!('_path' in options) || !('_search' in options)) {
            return Promise.reject(new Error('The _path and _search fields must be supplied for ${workflowPath}'));
        }
        return this._plug.at(workflowPath).post(JSON.stringify(options), utility.jsonRequestType).then((r) => r.json()).then(modelParser.createParser(workflowsModel));
    }
}
