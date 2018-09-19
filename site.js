import { Plug } from './plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { searchModel } from './models/search.model.js';
import { siteTagsModelGet, siteTagsModelPost } from './models/siteTags.model.js';
import { reportLogsModel } from './models/reportLogs.model.js';
import { logUrlModel } from './models/logUrl.model.js';
import { siteActivityModel } from './models/siteActivity.model.js';
import { searchAnalyticsModel } from './models/searchAnalytics.model.js';
import { searchAnalyticsQueryModel } from './models/searchAnalyticsQuery.model.js';
import { siteRolesModel } from './models/siteRoles.model.js';
import { localizationsModel } from './models/localizations.model.js';

function _buildSearchConstraints(params) {
    let constraints = [];
    if ('path' in params) {
        let path = params.path;
        if (path.substr(0, 1) === '/') {
            path = path.substr(1);
        }
        constraints.push('+path.ancestor:' + utility.searchEscape(path));
    }
    if ('tags' in params) {
        let tags = params.tags;
        if (typeof tags === 'string' && tags) {
            tags = tags.split(',');
        }
        tags.forEach(tag => {
            constraints.push('+tag:"' + utility.searchEscape(tag) + '"');
        });
    }
    if ('type' in params) {
        let types = params.type;
        if (typeof types === 'string' && types) {
            types = types.split(',');
        }
        types.forEach(type => {
            constraints.push('+type:' + utility.searchEscape(type));
        });
    }
    if ('namespaces' in params) {
        let namespaces = params.namespaces;
        if (typeof namespaces === 'string') {
            namespaces = namespaces.split(',');
        }
        namespaces.forEach(ns => {
            constraints.push(`+namespace:${utility.searchEscape(ns)}`);
        });
    }
    return constraints.length > 0 ? '+(' + constraints.join(' ') + ')' : '';
}

function _getBatchTagsTemplate(data) {
    var postBatchTagsTemplate = '<?xml version="1.0"?><tags>';
    if (Array.isArray(data.add) && data.add.length > 0) {
        data.add.forEach(elm => {
            let tagStr = `<tag.add value="${utility.escapeHTML(elm.name)}">`;
            elm.pageids.forEach(id => {
                tagStr += `<page id="${id}"></page>`;
            });
            tagStr += '</tag.add>';

            postBatchTagsTemplate = postBatchTagsTemplate + tagStr;
        });
    }
    if (Array.isArray(data.remove) && data.remove.length > 0) {
        data.remove.forEach(elm => {
            let tagStr = `<tag.remove value="${utility.escapeHTML(elm.name)}">`;
            elm.pageids.forEach(id => {
                tagStr += `<page id="${id}"></page>`;
            });
            tagStr += '</tag.remove>';
            postBatchTagsTemplate = postBatchTagsTemplate + tagStr;
        });
    }
    postBatchTagsTemplate = `${postBatchTagsTemplate}</tags>`;
    return postBatchTagsTemplate;
}

/**
 * A class for administering aspects of a MindTouch site.
 */
export class Site {
    /**
     * Construct a Site object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this.plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'site');
    }

    /**
     * Get the available site activity logs.
     * @returns {Promise.<reportLogsModel>} - A Promise that, when resolved, yields a {@link reportLogsModel} containing the available logs for site activity.
     */
    getSiteActivityLogs() {
        return this.plug
            .at('activity', 'logs')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(reportLogsModel));
    }

    /**
     * Get the available search query logs.
     * @returns {Promise.<reportLogsModel>} - A Promise that, when resolved, yields a {@link reportLogsModel} containing the available logs for search query.
     */
    getSearchQueryLogs() {
        return this.plug
            .at('query', 'logs')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(reportLogsModel));
    }

    /**
     * Get the localized string corresponding to the supplied resource key.
     * @param {Object} options - Options to direct the fetching of the localized string.
     * @param {String} options.key - The key that identifies the string to fetch.
     * @param {String} [options.lang] - A language code used to fetch the string in a specific language.  If not supplied, the current system language will be used.
     * @returns {Promise.<String>} - A Promise that, when resolved, yields the fetched string.
     */
    getResourceString(options = {}) {
        if (!('key' in options)) {
            return Promise.reject('No resource key was supplied');
        }
        let locPlug = this.plug.at('localization', options.key);
        if ('lang' in options) {
            locPlug = locPlug.withParam('lang', options.lang);
        }
        return locPlug
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.text());
    }

    /**
     * Fetch a batch of translated resource strings.
     * @param {Object} options Options to direct the fetching of the translated strings.
     * @param {Array} options.keys An array of resource keys to fetch the translations for.
     * @param {String} [options.lang] Optional language code to use for resource localization.
     * @returns {Promise} A promise that, when resolved, yields a localizationsModel containing the requested translations.
     */
    getResourceStrings({ keys, lang } = {}) {
        if (!keys || !Array.isArray(keys)) {
            return Promise.reject(new Error('The keys parameter must be supplied, and it must be an array.'));
        }
        const params = { resources: keys.join(',') };
        if (lang) {
            if (typeof lang !== 'string') {
                return Promise.reject(new Error('The lang parameter must be a string'));
            }
            params.lang = lang;
        }
        return this.plug
            .at('localizations')
            .withParams(params)
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(localizationsModel));
    }

    /**
     * Get the available search query log url.
     * @param {String} logName - Name of log to retrive URL from.
     * @returns {Promise.<availableLogsModel>} - A Promise that, when resolved, yields a {@link availableLogsModel} containing log url.
     */
    getSearchQueryLogUrl(logName) {
        if (typeof logName === 'undefined' || logName.length === 0) {
            return Promise.reject(new Error('Attempting to get log url without required name'));
        }
        return this.plug
            .at('query', 'logs', logName, 'url')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(logUrlModel));
    }

    /**
     * Get the available site activity log url.
     * @param {String} logName - Name of log to retrive URL from.
     * @returns {Promise.<availableLogsModel>} - A Promise that, when resolved, yields a {@link logUrlModel} containing log url.
     */
    getSiteActivityLogUrl(logName) {
        if (typeof logName === 'undefined' || logName.length === 0) {
            return Promise.reject(new Error('Attempting to get log url without required name'));
        }
        return this.plug
            .at('activity', 'logs', logName, 'url')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(logUrlModel));
    }

    /**
     * Get tags list.
     * @param {String} [params] - Parameters to send along to the API.
     * @returns {Promise.<Object>} - A Promise that will be resolved with the tags data, or rejected with an error specifying the reason for rejection.
     */
    getTags(params = {}) {
        const siteTagsModelParser = modelParser.createParser(siteTagsModelGet);
        return this.plug
            .at('tags')
            .withParams(params)
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(siteTagsModelParser);
    }

    /**
     * Post tags list for each page that each tag in contained in.
     * @param {Object} [params] - Options to direct the fetching of the localized tags.
     * @param {Array} [params.add] - A tag array containing all the pages containing this tag where they need to be added.
     * @param {Array} [params.remove] - A tag array containing all the pages containing this tag where they need to be removed.
     * @returns {Promise.<Object>} - A Promise that will be resolved with the tags data, or rejected with an error specifying the reason for rejection.
     */
    setTags(params = {}) {
        const XMLBatchData = _getBatchTagsTemplate(params);
        const siteTagsModelParser = modelParser.createParser(siteTagsModelPost);
        return this.plug
            .at('tags')
            .post(XMLBatchData, 'application/xml')
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(siteTagsModelParser);
    }

    /**
     * Perform a search across the site.
     * This function takes a single parameter with the following options.
     * @param {Number} [limit=10] - Limit search results to the specified number of items per paginated page.
     * @param {Number} [offset=10] - The index in the total query results at which to begin the returned result set.
     * @param {String|Array} [tags=''] - A comma-separated list or array of tags to constrain search results to items containing one of the tags.
     * @param {String|Array} [type=''] - Type or types to filter the results in a comma delimited list or an array.  Valid types: `wiki`, `document`, `image`, `binary`
     * @param {String} [q=''] - Search keywords or advanced search syntax.
     * @param {String} [path=''] - A page path to constrain the search results to items located under the specified path.
     * @param {String|Array} [namespace='main'] - A comma-separated list or array of namespaces to filter the results by. Valid namespaces: 'main', 'template', 'user'.
     * @param {String} [sessionid=null] - An identifier to know that the query is grouped with the previous query.
     * @param {Boolean} [recommendations=true] - `true` to include recommended search results based off site configuration. `false` to suppress them.
     * @returns {Promise.<searchModel>} - A Promise that, when resolved, yields the results from the search in a {@link searchModel}.
     */
    search({
        limit = 10,
        offset = 0,
        q = '',
        path = '',
        recommendations = true,
        tags = '',
        type = '',
        namespaces = 'main',
        sessionid = null
    } = {}) {
        const constraint = {};
        if (path !== '' && path !== '/') {
            constraint.path = path;
        }
        if (tags !== '') {
            constraint.tags = tags;
        }
        if (type !== '') {
            constraint.type = type;
        }
        constraint.namespaces = namespaces;
        const searchParams = {
            limit,
            offset,
            sortBy: '-rank',
            q,
            summarypath: encodeURI(path),
            constraint: _buildSearchConstraints(constraint),
            recommendations
        };
        if (sessionid) {
            searchParams.sessionid = sessionid;
        }
        return this.plug
            .at('query')
            .withParams(searchParams)
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(searchModel));
    }

    /**
     * Search the site index
     * @param {Object} options - The options to direct the search operation.
     * @param {String} options.q The search string
     * @param {Number|String} [options.limit=100] The maximum number of items to retrieve. Must be a positive number or 'all' to retrieve all items.
     * @param {Number} [options.offset=0] Number of items to skip. Must be a positive number or 0 to not skip any.
     * @param {String} [options.sortBy='-score'] Sort field. Prefix value with '-' to sort descending.
     * @param {String} options.constraintString The pre-built constraint string to use. If not supplied, it will be built from the options.constraints object. If both options.constraintString and options.constraints are supplied, this parameter will take precedence.
     * @param {Object} [options.constraints={}] Addidional search constraints
     * @param {String} options.constraints.type The article type to filter from the results.
     * @param {String} options.constraints.path The path to use for path.ancestor in the search constraint.
     * @param {Array} options.constraints.tags An array of tags to only consider when returning page results.
     * @param {Array} options.constraints.namespaces An array of namespaces to limit the results by.
     * @param {Boolean} [options.verbose=true] Show verbose page xml
     * @param {String} [options.parser='bestguess'] - The parser to use for the query. Must be one of "bestguess", "term", "filename", "lucene"
     * @returns {Promise.<Object>} - A Promise that will be resolved with the search results, or rejected with an error specifying the reason for rejection.
     */
    searchIndex({
        q = '',
        limit = 100,
        offset = 0,
        sortBy = '-score',
        constraintString = null,
        constraints = {},
        verbose = true,
        parser = 'bestguess',
        format = 'xml'
    } = {}) {
        if (typeof limit === 'string') {
            if (limit !== 'all') {
                return Promise.reject(new Error('The limit for index searching must be a number or "all"'));
            }
        }
        const searchParams = {
            q,
            limit,
            offset,
            sortby: sortBy,
            constraint: constraintString || _buildSearchConstraints(constraints),
            verbose,
            parser,
            format
        };
        return this.plug
            .at('search')
            .withParams(searchParams)
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(searchModel));
    }

    /**
     * Get the analytics for search on the site
     * @param {Object} options - The paramaters to pass through with the request
     * @param {String} [options.start] - The start date (YYYYMMDDHHMMSS)
     * @param {String} [options.end] - The end date (YYYYMMDDHHMMSS)
     * @param {String} [options.queryFilters] - the stem queries you want to return results for
     * @param {String} [options.userFilter] - The user type you want to filter by (Anonymous, Community, Pro)
     * @param {String} [options.groupIds] - Filter all search data by a set of comma separated group ids
     * @param {String} [options.bucket] - The time you want to bucket results into
     * @param {String} [options.origin] - The source of the search query (mt-web, mt-api, etc)
     * @param {String} [options.webWidgetEmbedId] - the embed id for the source web widget
     * @param {String} [options.sortBy] - Sort table data by this field (e.g. clicks, position) (default: clicks)
     * @param {String} [options.sortOrder] - Sort direction to be used with sortby (e.g. asc, desc) (default: desc)
     * @param {Number} [options.limit] - Number of clicked results to return results for (between 1 and 1000 inclusive) (default: 100)
     * @returns {Promise.<Object>} - A Promise that will be resolved with the search analytics data, or rejected with an error specifiying the reason for rejection.
     */
    getSearchAnalytics({
        start = null,
        end = null,
        queryFilters = null,
        userFilter = null,
        groupIds = null,
        bucket = null,
        origin = null,
        webWidgetEmbedId = null,
        sortBy = null,
        sortOrder = null,
        limit = null
    }) {
        const searchParams = {
            start,
            end,
            queryFilters,
            userFilter,
            groupids: groupIds,
            bucket,
            originFilter: origin,
            web_widget_embed_id: webWidgetEmbedId, // eslint-disable-line camelcase
            sortby: sortBy,
            sortorder: sortOrder,
            limit
        };
        return this.plug
            .at('search', 'analytics')
            .withParams(utility.cleanParams(searchParams))
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(searchAnalyticsModel));
    }

    /**
     * Get the search analytics for the given period for a particular query
     * @param {Object} options - The paramaters to pass through with the request
     * @param {String} [options.query] - Query to generate analytics for
     * @param {String} [options.start] - The start date (YYYYMMDDHHMMSS)
     * @param {String} [options.end] - The end date (YYYYMMDDHHMMSS)
     * @param {String} [options.userFilter] - The user type you want to filter by (Anonymous, Community, Pro)
     * @param {String} [options.groupIds] - Filter all search data by a set of comma separated group ids
     * @param {String} [options.bucket] - The time you want to bucket results into (e.g. day, month) (default: month)
     * @param {String} [options.origin] - The source of the search query (mt-web, mt-api, etc)
     * @param {String} [options.webWidgetEmbedId] - the embed id for the source web widget
     * @param {String} [options.sortBy] - Sort table data by this field (e.g. clicks, position) (default: clicks)
     * @param {String} [options.sortOrder] - Sort direction to be used with sortby (e.g. asc, desc) (default: desc)
     * @param {Number} [options.limit] - Number of clicked results to return results for (between 1 and 1000 inclusive) (default: 100)
     * @returns {Promise.<Object>} - A Promise that will be resolved with the search analytics data, or rejected with an error specifiying the reason for rejection.
     */
    getSearchAnalyticsQuery({
        query,
        start = null,
        end = null,
        userFilter = null,
        groupIds = null,
        bucket = null,
        origin = null,
        webWidgetEmbedId = null,
        sortBy = null,
        sortOrder = null,
        limit = null
    }) {
        const searchParams = {
            query,
            start,
            end,
            userFilter,
            groupids: groupIds,
            bucket,
            originFilter: origin,
            web_widget_embed_id: webWidgetEmbedId, // eslint-disable-line camelcase
            sortby: sortBy,
            sortorder: sortOrder,
            limit
        };
        return this.plug
            .at('search', 'analytics', 'query')
            .withParams(utility.cleanParams(searchParams))
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(searchAnalyticsQueryModel));
    }

    /**
     * Get the activity stats for the site.
     * @param {Date} [since] Start date for report.
     * @returns {Promise.<Object>} - A Promise that will be resolved with the activity data, or rejected with an error specifying the reason for rejection.
     */
    getActivity(since = null) {
        let activityPlug = this.plug.at('activity');
        if (since !== null) {
            if (!(since instanceof Date)) {
                return Promise.reject(new Error('The `since` parameter must be of type Date.'));
            }

            // Create a date string of the format `yyyyMMddHHmmss`
            const sinceString = utility.getApiDateString(since);
            activityPlug = activityPlug.withParam('since', sinceString);
        }
        return activityPlug
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(siteActivityModel));
    }

    /**
     * Retrieve list of defined roles
     * @returns {Promise.<Object>} - A Promise that will be resolved with the roles info, or rejected with an error specifying the reason for rejection.
     */
    getRoles() {
        return this.plug
            .at('roles')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(siteRolesModel));
    }

    /**
     * Send feedback to the site owner.
     * @param {Object} feedbackData The data to send as the feedback.
     * @param {String} feedbackData.comment The comment body.
     * @param {String} [feedbackData.title] The title/subject for the feedback.
     * @param {Object} [feedbackData.metadata] Additional data to accompany the feedback submission.
     * @returns {Promise} A Promise that, when resolved, indicates a successful feedback submission.
     */
    sendFeedback({ comment, title, metadata = {} } = {}) {
        if (typeof comment !== 'string') {
            return Promise.reject(new Error('The `comment` parameter must be supplied, and must be a string.'));
        }
        let feedbackXml = '<feedback>';
        feedbackXml += `<body>${comment}</body>`;
        if (title) {
            if (typeof title !== 'string') {
                return Promise.reject(new Error('The title parameter must be a string.'));
            }
            feedbackXml += `<title>${title}</title>`;
        }
        feedbackXml += '<metadata>';
        if (typeof metadata !== 'object') {
            return Promise.reject(new Error('The `metadata` parameter must be an object.'));
        }
        Object.keys(metadata).forEach(key => {
            feedbackXml += `<${key}>${metadata[key].toString()}</${key}>`;
        });
        feedbackXml += '</metadata>';
        feedbackXml += '</feedback>';
        return this.plug
            .at('feedback')
            .post(feedbackXml, utility.xmlRequestType)
            .catch(err => Promise.reject(err));
    }
}
