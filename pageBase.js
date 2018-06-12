import { ProgressPlug } from '/mindtouch-http.js/progressPlug.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { pageModel } from './models/page.model.js';
import { pageContentsModel } from './models/pageContents.model.js';
import { pageTagsModel } from './models/pageTags.model.js';
import { pageFilesModel } from './models/pageFiles.model.js';
import { pageEditModel } from './models/pageEdit.model.js';
import { relatedPagesModel } from './models/relatedPages.model.js';
import { fileModel } from './models/file.model.js';
import { pageOverviewModel } from './models/pageOverview.model.js';
import { pageDiffModel } from './models/pageDiff.model.js';
import { recommendedTagsModelParser } from './models/recommendedTags.model.js';
import { apiErrorModel } from './models/apiError.model.js';

const _errorParser = modelParser.createParser(apiErrorModel);

function _handleVirtualPage(error) {
    if (error.status === 404 && error.responseText) {
        let responseJson = JSON.parse(error.responseText);
        if (responseJson['@virtual'] === 'true') {
            let pageModelParser = modelParser.createParser(pageModel);
            return Promise.resolve(pageModelParser(responseJson));
        }
    }
    throw error;
}
function _getSaveXML(data) {
    let template = '';
    if (Array.isArray(data)) {
        data.forEach(tag => {
            template = `${template}<tag value="${utility.escapeHTML(tag)}" />`;
        });
    }
    template = `<tags>${template}</tags>`;
    return template;
}
/**
 * The base class for managing a published page.
 */
export class PageBase {
    constructor(id) {
        if (this.constructor.name === 'PageBase') {
            throw new TypeError('PageBase must not be constructed directly.  Use one of Page() or Draft()');
        }
        this._id = utility.getResourceId(id, 'home');
    }

    /**
     * Gets the full page information.
     * @param {Object} [params] - Additional parameters to direct the API request.
     * @returns {Promise.<pageModel>} - A Promise that, when resolved, yields a {@link pageModel} containing the full page information.
     */
    getFullInfo(params = {}) {
        let pageModelParser = modelParser.createParser(pageModel);
        return this._plug
            .withParams(params)
            .get()
            .then(r => r.json())
            .then(pageModelParser)
            .catch(_handleVirtualPage);
    }
    getContents(params) {
        let pageContentsModelParser = modelParser.createParser(pageContentsModel);
        return this._plug
            .at('contents')
            .withParams(params)
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(pageContentsModelParser);
    }
    setContents(contents, params = {}) {
        if (typeof contents !== 'string') {
            return Promise.reject(new Error('Contents should be string.'));
        }
        let contentsParams = {
            edittime: 'now'
        };
        Object.keys(params).forEach(key => {
            contentsParams[key] = params[key];
        });
        let pageEditModelParser = modelParser.createParser(pageEditModel);
        return this._plug
            .at('contents')
            .withParams(contentsParams)
            .post(contents, utility.textRequestType)
            .catch(err => Promise.reject(_errorParser(err)))
            .then(r => r.json())
            .then(pageEditModelParser);
    }
    getFiles(params = {}) {
        let pageFilesModelParser = modelParser.createParser(pageFilesModel);
        return this._plug
            .at('files')
            .withParams(params)
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(pageFilesModelParser);
    }
    attachFile(file, { name = file.name, size = file.size, type = file.type, progress = null } = {}) {
        if (progress !== null) {
            const progressPlug = new ProgressPlug(this._plug.url, this._settings.plugConfig);
            const progressInfo = { callback: progress, size };
            return progressPlug
                .at('files', encodeURIComponent(encodeURIComponent(name)))
                .put(file, type, progressInfo)
                .catch(err => Promise.reject(err))
                .then(r => JSON.parse(r.responseText))
                .then(modelParser.createParser(fileModel));
        }
        return this._plug
            .withHeader('Content-Length', size)
            .at('files', encodeURIComponent(name))
            .put(file, type)
            .catch(err => Promise.reject(err))
            .then(r => r.json());
    }
    getOverview() {
        return this._plug
            .at('overview')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(pageOverviewModel));
    }
    setOverview(options = {}) {
        if (!('body' in options)) {
            return Promise.reject(new Error('No overview body was supplied'));
        }
        let request = `<overview>${utility.escapeHTML(options.body)}</overview>`;
        return this._plug
            .at('overview')
            .put(request, utility.xmlRequestType)
            .catch(err => Promise.reject(err));
    }
    getTags() {
        let pageTagsModelParser = modelParser.createParser(pageTagsModel);
        return this._plug
            .at('tags')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(pageTagsModelParser);
    }
    setTags(params = {}, queryParams = {}) {
        const XMLData = _getSaveXML(params);
        const pageTagsModelParser = modelParser.createParser(pageTagsModel);

        return this._plug
            .at('tags')
            .withParams(queryParams)
            .put(XMLData, 'application/xml')
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(pageTagsModelParser);
    }

    /**
     * Get recommended tags for a page
     * @returns {Promise} A Promise that, when resolved yields a list of recommended tags.
     */
    getRecommendedTags() {
        return this._plug
            .at('tags', 'recommended')
            .get()
            .catch(err => Promise.reject(_errorParser(err)))
            .then(r => r.json())
            .then(modelParser.createParser(recommendedTagsModelParser));
    }

    /**
     * Show changes between 2 different versions.
     * @param {Object} [params] Parameters that direct the fetching of the page diff.
     * @param {String|Number} params.previous Positive integer or a TimeUUID of the previous page revision to retrieve.
     * @param {String|Number} [params.revision=head] Positive integer or a TimeUUID of the page revision to retrieve.
     * @param {String} [params.includeVersions=false] Specifies whether the returned diff will include only the combined diff, or if the previous and current revision changes will also be included.
     * @param {String} [params.format=html] The format of the resulting diff. Must be one of "html" or "xhtml".
     * @returns {Promise} A Promise that, when resolved, yields a pageDiffModel containing the HTML representations of the diff.
     */
    getDiff({ previous, revision = 'head', includeVersions = false, format = 'html' } = {}) {
        if (!previous) {
            return Promise.reject(new Error('The `previous` parameter must be supplied.'));
        }
        if (typeof previous !== 'string' && typeof previous !== 'number') {
            return Promise.reject(new Error('The `previous` parameter must be a number or a string.'));
        }
        if (typeof revision !== 'string' && typeof revision !== 'number') {
            return Promise.reject(new Error('The revision parameter must be a number or a string.'));
        }
        if (typeof includeVersions !== 'boolean') {
            return Promise.reject(new Error('The `includeRevisionis` parameter must be a Boolean value.'));
        }
        if (format !== 'html' && format !== 'xhtml') {
            return Promise.reject(new Error('The `format` parameter must be a string equal to "html" or "xhtml".'));
        }
        return this._plug
            .at('diff')
            .withParams({ previous, revision, diff: includeVersions ? 'all' : 'combined', format })
            .get()
            .catch(err => Promise.reject(_errorParser(err)))
            .then(r => r.json())
            .then(modelParser.createParser(pageDiffModel));
    }
    getRelated(params = {}) {
        return this._plug
            .at('related')
            .withParams(params)
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(relatedPagesModel));
    }

    /**
     * Revert page to an earlier revision
     * @param {Object} options - The options that direct the revert operation
     * @param {String|Number} options.fromRevision - Revision number of page or a TimeUUID string that will become the new head revision.
     * @param {String} [options.abort=conflict] - The condition under which to prevent the revert operation. Must be one of 'never' or 'conflict'.
     * @param {Boolean} [options.verbose=false] - Specifies whether or not the conflicted elements will be returned in the response.
     * @returns {Promise} - A Promise that will be resolved when the revert operation is complete, or rejected with an error specifying the reason for rejection.
     */
    revert(options) {
        if (!options) {
            return Promise.reject(new Error('The revert options must be specified.'));
        }
        if (typeof options.fromRevision !== 'string' && typeof options.fromRevision !== 'number') {
            return Promise.reject(
                new Error('The fromRevision parameter must be specified, and must be a string or a number.')
            );
        }
        const params = { fromrevision: options.fromRevision };
        if (options.abort) {
            if (typeof options.abort !== 'string' || (options.abort !== 'never' && options.abort !== 'conflict')) {
                return Promise.reject(new Error('The `abort` parameter must be set to "conflict" or "never".'));
            }
            params.abort = options.abort;
        }
        if ('verbose' in options && options.verbose !== true && options.verbose !== false) {
            return Promise.reject(new Error('The `verbose` parameter must be a Boolean value.'));
        }
        params.allow = options.allow;
        params.abort = options.abort;
        return this._plug
            .at('revert')
            .withParams(params)
            .post(null, utility.textRequestType)
            .catch(err => Promise.reject(err));
    }
}
