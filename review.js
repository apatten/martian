import { Plug } from '/mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { valid, required, string, number } from './lib/validation.js';
import { utility } from './lib/utility.js';
import { reviewModel } from './models/review.model.js';

function formatOptions(options) {
    options[`${options.reviewerType}Id`] = options.reviewerId;
    delete options.reviewerId;
    delete options.reviewerType;
    let xml = '<review>';
    Object.keys(options).forEach((property) => {
        xml += `<${property.toLowerCase()}>${options[property]}</${property.toLowerCase()}>`;
    });
    xml += '</review>';
    return xml;
}

/**
 * A class for handling Page reviews
 */
export class Review {

    /**
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._settings = settings;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'reviews');
    }

    /**
     * List reviews for a page
     * @param {Number|String} pageId The numeric page ID or the page path.
     * @returns {Promise} A Promise that is resolved, or rejected with an error specifying the reason for rejection.
     */
    list(pageId) {
        if(typeof pageId === 'undefined') {
            return Promise.reject(new Error('No Page Id'));
        }
        return new Plug(this._settings.host, this._settings.plugConfig).at('@api', 'deki', 'pages', pageId, 'reviews')
            .get()
            .catch((err) => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(reviewModel))
            .then(results => results.articleReview);
    }

    /**
     * Start a new review
     * @param {Object} options Options Object
     * @param {Number|String} options.pageId The numeric page ID or the page path.
     * @param {Number|String} options.reviewerId The numeric ID of the requested reviewer
     * @param {String} options.reviewerType The type (user|group) of the requested reviewer
     * @param {String} options.comment Optional comment
     * @param {String} options.label State Label
     * @returns {Promise} A Promise that is resolved, or rejected with an error specifying the reason for rejection.
     */
    create(options) {
        const optionsErrors = valid.object(
            options,
            required('pageId', number()),
            required('reviewerId', number()),
            required('reviewerType', string())
        );
        if(optionsErrors.length > 0) {
            return Promise.reject(optionsErrors.join(', '));
        }
        options.label = 'Review Requested';
        return this._plug
            .post(formatOptions(options), utility.xmlRequestType)
            .catch((err) => Promise.reject(err));
    }

    /**
     * Update review
     * @param {Object} options Options Object
     * @param {Number} options.reviewId The numeric page ID of the review.
     * @param {Number|String} options.reviewerId The numeric ID of the requested reviewer
     * @param {String} options.reviewerType The type (user|group) of the requested reviewer
     * @param {String} options.label State Label
     * @param {String} options.comment Optional comment
     * @returns {Promise} A Promise that is resolved, or rejected with an error specifying the reason for rejection.
     */
    update(options) {
        const optionsErrors = valid.object(
            options,
            required('reviewId', number()),
            required('reviewerId', number()),
            required('reviewerType', string()),
            required('label', string())
        );
        if(optionsErrors.length > 0) {
            return Promise.reject(optionsErrors.join(', '));
        }
        return this._plug
            .at(options.reviewId, 'next')
            .post(formatOptions(options), utility.xmlRequestType)
            .catch((err) => Promise.reject(err));
    }
}
