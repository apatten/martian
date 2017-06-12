import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { valid, required, all, one, equals, bool, string } from './lib/validation.js';
import { modelParser } from './lib/modelParser.js';
import { pageSubscriptionsModel } from './models/pageSubscriptions.model.js';

/**
 * A class for managing the properties of a page.
 */
export class PageSubscription {

    /**
     * Construct a new PageSubscription object.
     * @param {String} siteId The ID of the site.
     * @param {Number|String} [pageId='home'] The numeric page ID or the page path.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(siteId, pageId = 'home', settings = new Settings()) {
        const error = valid.value(siteId, string());
        if(error.length > 0) {
            throw new Error('The siteId parameter must be supplied, and must be a string.');
        }
        this._plug = new Plug(settings.host, settings.plugConfig)
            .at('@api', 'deki', 'pagesubservice', 'pages', utility.getResourceId(pageId, 'home'))
            .withParam('siteid', siteId);
    }

    subscribe({ type = 'page', recursive = false } = {}) {
        const optionsErrors = valid.object({ type, recursive },
            required('type', all(string(), one(equals('page'), equals('draft')))),
            required('recursive', bool())
        );
        if(optionsErrors.length > 0) {
            return Promise.reject(new Error(optionsErrors.join(', ')));
        }
        return this._plug.withParams({ type, depth: recursive ? 'infinity' : '0' }).post('', utility.textRequestType);
    }

    unsubscribe({ type = 'page' } = {}) {
        const error = valid.value(type, all(string(), one(equals('page'), equals('draft'))));
        if(error.length > 0) {
            return Promise.reject('The type parameter must be a string set to either "page" or "draft".');
        }
        return this._plug.withParams({ type }).delete();
    }
}

export class PageSubscriptionManager {
    constructor(siteId, settings = new Settings()) {
        const error = valid.value(siteId, string());
        if(error.length > 0) {
            throw new Error('The siteId parameter must be supplied, and must be a string.');
        }
        this._plug = new Plug(settings.host, settings.plugConfig)
            .at('@api', 'deki', 'pagesubservice', 'subscriptions')
            .withParam('siteid', siteId);
    }

    getSubscriptions() {
        return this._plug.get()
            .then((r) => r.json())
            .then(modelParser.createParser(pageSubscriptionsModel));
    }
}
