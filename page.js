import { Plug } from 'mindtouch-http.js/plug.js';
import { ProgressPlug } from 'mindtouch-http.js/progressPlug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { PageBase } from './pageBase.js';
import { pageModel } from './models/page.model.js';
import { subpagesModel } from './models/subpages.model.js';
import { pageContentsModel } from './models/pageContents.model.js';
import { pageTreeModel } from './models/pageTree.model.js';
import { pageRatingModel } from './models/pageRating.model.js';
import { pageMoveModel } from './models/pageMove.model.js';
import { pageRatingsModel } from './models/pageRatings.model.js';
import { pageDeleteModel } from './models/pageDelete.model.js';
import { importArchiveModel } from './models/importArchive.model.js';
import { pageExportModel } from './models/pageExport.model.js';
import { pageFindModel } from './models/pageFind.model.js';
import { apiErrorModel } from './models/apiError.model.js';

const _errorParser = modelParser.createParser(apiErrorModel);

/**
 * A class for managing a published page.
 */
export class Page extends PageBase {

    /**
     * Construct a new Page.
     * @param {Number|String} [id='home'] The numeric page ID or the page path.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id = 'home', settings = new Settings()) {
        super(id);
        this._settings = settings;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages', this._id);
    }

    /**
     * Gets the basic page information.
     * @param {Object} [params] - Additional parameters to direct the API request.
     * @returns {Promise.<pageModel>} - A Promise that, when resolved, yields a {@link pageModel} containing the basic page information.
     */
    getInfo(params = {}) {
        let infoParams = { exclude: 'revision' };
        Object.keys(params).forEach((key) => {
            infoParams[key] = params[key];
        });
        let pageModelParser = modelParser.createParser(pageModel);
        return this._plug.at('info').withParams(infoParams).get().then((r) => r.json()).then(pageModelParser);
    }

    /**
     * Get the subpages of the page.
     * @param {Object} [params] - Additional parameters to direct the API request.
     * @returns {Promise.<subpagesModel>} - A Promise that, when resolved, yields a {@link subpagesModel} containing the basic page information.
     */
    getSubpages(params) {
        return this._plug.at('subpages').withParams(params).get().then((r) => r.json()).then(modelParser.createParser(subpagesModel));
    }

    /**
     * Get a hierarchy tree based on the current page.
     * @param {Object} [params] - Additional parameters to direct the API request.
     * @returns {Promise.<pageTreeModel>} - A Promise that, when resolved, yields a {@link pageTreeModel} containing the basic page information.
     */
    getTree(params) {
        let pageTreeModelParser = modelParser.createParser(pageTreeModel);
        return this._plug.at('tree').withParams(params).get().then((r) => r.json()).then(pageTreeModelParser);
    }

    /**
     * Get the hierarchical list of pages IDs from the current page to the home page.
     * @returns {Promise.<Array>} - The array of hierarchical page IDs.
     */
    getTreeIds() {
        return this._plug.at('tree').withParam('format', 'ids').get().then((r) => r.text()).then((idString) => {
            return idString.split(',').map((id) => {
                let numId = parseInt(id, 10);
                if(isNaN(numId)) {
                    throw new Error('Unable to parse the tree IDs.');
                }
                return numId;
            });
        }).catch((e) => {
            return Promise.reject({ message: e.message });
        });
    }

    /**
     * Gets the rating information for the page.
     * @returns {Promise.<pageRatingModel>} - A Promise that, when resolved, yields a {@link pageRatingModel} containing the rating information.
     */
    getRating() {
        return this._plug.at('ratings').get().then((r) => r.json()).then(modelParser.createParser(pageRatingModel));
    }

    /**
     * Set the rating for the page.
     * @param {Number|null} [rating=null] - The new rating for the page.
     * @param {Number|null} [oldRating=null] - The old rating for the page that is being replaced by {@see rating}.
     * @returns {Promise.<pageRatingModel>} - A Promise that, when resolved, yields a {@link pageRatingModel} containing the new rating information.
     */
    rate(rating = null, oldRating = null) {
        if(rating !== 1 && rating !== 0 && rating !== null) {
            throw new Error('Invalid rating supplied');
        }
        if(oldRating !== 1 && oldRating !== 0 && oldRating !== null) {
            throw new Error('Invalid rating supplied for the old rating');
        }
        if(rating === null) {
            rating = '';
        }
        if(oldRating === null) {
            oldRating = '';
        }
        return this._plug.at('ratings').withParams({ score: rating, previousScore: oldRating }).post(null, utility.textRequestType).then((r) => r.json()).then(modelParser.createParser(pageRatingModel));
    }

    /**
     * Gets a MindTouch template rendered in the context of the current page, as HTML.
     * @param {String} path - The template path.
     * @param {Object} [params] - Additional parameters to direct the API request.
     * @returns {Promise.<pageContentsModel>} - A Promise that, when resolved, yields the rendered HTML within a {@link pageContentsModel}.
     */
    getHtmlTemplate(path, params = {}) {
        params.pageid = this._id;

        // Double-URL-encode the path and add '=' to the beginning.  This makes
        //  it a proper page ID to be used in a URI segment.
        let templatePath = '=' + encodeURIComponent(encodeURIComponent(path));
        let contentsPlug = new Plug(this._settings.host, this._settings.plugConfig).at('@api', 'deki', 'pages', templatePath, 'contents').withParams(params);
        let pageContentsModelParser = modelParser.createParser(pageContentsModel);
        return contentsPlug.get().then((r) => r.json()).then(pageContentsModelParser);
    }

    /**
     * Copy a page to a specified location
     * @param {Object} params - The params that direct the copy operation.
     * @param {String} params.to - The new page location including the path and name of the page.
     * @param {String} [params.title] - Set the title of the page. If not specified, default to the original title.
     * @param {Boolean} [params.tags=true] - Copy the tags of the page on copy.
     * @param {Boolean} [params.attachments=true] - Copy the attachments of the page on copy.
     * @param {Boolean} [params.recursive=false] - Copy the child hierarchy of the original page.
     * @param {String} [params.abort='exists'] - Specifies condition under which to prevent the update. Allowed values are 'exists' and 'never'.
     * @param {String} [params.allow] - Specifies condition under which to allow the update when an error would normally be thrown.
     * @returns {Promise.<pageMoveModel>} - A Promise that, when resolved, yields a {@link pageMoveModel} containing information regarding the move operation.
     */
    copy(params = {}) {
        if(!params.to) {
            return Promise.reject(new Error('The copy target location must be specified in the `to` parameter.'));
        }
        if(params.abort && params.abort !== 'exists' && params.abort !== 'never') {
            return Promise.reject(new Error('The `abort` parameter must be either "exists" or "never".'));
        }
        if(params.allow && params.allow !== 'deleteredirects') {
            return Promise.reject('The `allow` parameter, if specified, must have a value of "deleteredirects"');
        }
        return this._plug.at('copy')
            .withParams(params)
            .post(null, utility.textRequestType)
            .then((r) => r.json())
            .then(modelParser.createParser(pageMoveModel))
            .catch((err) => Promise.reject(_errorParser(err)));
    }

    /**
     * Move a page to a new location in the hierarchy.
     * @param {Object} [params] - Additional parameters to direct the API request.
     * @returns {Promise.<pageMoveModel>} - A Promise that, when resolved, yields a {@link pageMoveModel} containing information regarding the move operation.
     */
    move(params = {}) {
        return this._plug.at('move')
            .withParams(params)
            .post(null, utility.textRequestType)
            .then((r) => r.json())
            .then(modelParser.createParser(pageMoveModel))
            .catch((err) => Promise.reject(_errorParser(err)));
    }

    /**
     * Delete a page
     * @returns {Promise.<pageDeleteModel>} - A Promise that, when resolved, yields a {@link pageDeleteModel} containing information regearding pages that were deleted.
     */
    delete(recursive = false) {
        const pageDeleteModelParser = modelParser.createParser(pageDeleteModel);
        return this._plug.withParam('recursive', recursive).delete().then((r) => r.json()).then(pageDeleteModelParser);
    }

    /**
     * Using the current page, activates a draft; copying the page's content and attachments.
     * @returns {Promise.<pageModel>} - A Promise that, when resolved, yields a {@link pageModel} containing the page information following the activation.
     */
    activateDraft() {
        let pageModelParser = modelParser.createParser(pageModel);
        return this._plug.at('activate-draft').post().then((r) => r.json()).then(pageModelParser);
    }

    /**
     * Import a MindTouch archive file as a child node of the page.
     *
     */
    importArchive(file, { name = file.name, size = file.size, type = file.type, progress = null } = {}, params = {}) {
        const apiParams = Object.assign({ filename: name, behavior: 'async' }, params);
        if(progress !== null) {
            const progressPlug = new ProgressPlug(this._settings.host, this._settings.plugConfig).at('@api', 'deki', 'pages', this._id);
            const progressInfo = { callback: progress, size: size };
            return progressPlug.at('import').withParams(apiParams).put(file, type, progressInfo)
                .then((r) => JSON.parse(r.responseText))
                .catch((e) => Promise.reject(JSON.parse(e.responseText)))
                .then(modelParser.createParser(importArchiveModel));
        }
        return this._plug.withHeader('Content-Length', size).withParams(apiParams).at('import').put(file, type)
            .then((r) => r.json())
            .catch((e) => Promise.reject(JSON.parse(e.responseText)))
            .then(modelParser.createParser(importArchiveModel));
    }

    /**
     * Generates the information so that clients can stream down the exported page(s) in mtarc format.
     */
    getExportInformation() {
        return this._plug.at('export').post(null, utility.textRequestType).then((r) => r.json()).then(modelParser.createParser(pageExportModel));
    }
}

/**
 * A class for managing all of the published pages on a site.
 */
export class PageManager {
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages');
    }

    /**
     * Get the ratings that have been set for a series of pages.
     * @param {Array} pageIds - The list of pages for which ratings data is fetched.
     * @returns {Promise.<pageRatingsModel>} - A Promise that, when resolved, yields a {@link pageRatingsModel} object with the ratings information.
     */
    getRatings(pageIds) {
        const ratingsPlug = this._plug.at('ratings').withParams({ pageids: pageIds.join(',') });
        return ratingsPlug.get().then((r) => r.json()).then(modelParser.createParser(pageRatingsModel));
    }

    /**
     * Find pages based on supplied constraints
     * @param {Object} options - The options to direct the results of the find operation.
     * @param {Number|String} [options.parentId=home] - The parent ID of the hierarchy to search. Either a numeric page ID or a page path string.
     * @param {Array} [options.tags=[]] - An array of tags that the found pages must contain.
     * @param {Array} [options.missingClassifications=[]] - An array of classification prefixes that must not exist on the pages.
     * @param {Date} [options.since] - Find pages last modified since this date.
     * @param {Date} [options.upTo=Date.now()] - Find pages last modified up to this date.
     */
    findPages(options = {}) {
        let paramFound = false;
        const params = {};
        if(options.parentId) {
            params.parentid = utility.getResourceId(options.parentId, 'home');
            paramFound = true;
        }
        if(options.tags) {
            if(!Array.isArray(options.tags)) {
                return Promise.reject(new Error('The `tags` parameter must be an Array.'));
            }
            if(options.tags.length > 0) {
                params.tags = options.tags.join(',');
                paramFound = true;
            }
        }
        if(options.missingClassifications) {
            if(!Array.isArray(options.missingClassifications)) {
                return Promise.reject(new Error('The `missingClassifications` parameter must be an Array.'));
            }
            if(options.missingClassifications.length > 0) {
                params.missingclassifications = options.missingClassifications.join(',');
                paramFound = true;
            }
        }
        if(options.since) {
            if(!(options.since instanceof Date)) {
                return Promise.reject(new Error('The `since` parameter must be of type Date.'));
            }
            params.since = utility.getApiDateString(options.since);
            paramFound = true;
        }
        if(options.upTo) {
            if(!(options.upTo instanceof Date)) {
                return Promise.reject(new Error('The `upTo` parameter must be of type Date.'));
            }
            params.upto = utility.getApiDateString(options.upTo);
            paramFound = true;
        }
        if(paramFound === false) {
            return Promise.reject(new Error('At least one constraint must be supplied to find pages.'));
        }
        return this._plug.at('find')
            .withParams(params)
            .get()
            .then((r) => r.json())
            .catch((err) => Promise.reject(_errorParser(err)))
            .then(modelParser.createParser(pageFindModel));
    }
}
