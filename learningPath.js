import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { learningPathsModel } from './models/learningPaths.model.js';
import { learningPathModel } from './models/learningPath.model.js';
import { learningPathCategoriesModel } from './models/learningPathCategories.model.js';
import { pageModel } from './models/page.model.js';

export class LearningPath {

    /**
     * Create a new Learning Path.
     * @param {String} name The name of the Learning Path represented by this instance.
     * @param {Settings} settings The martian settings to direct the Learning Path API calls.
     */
    constructor(name, settings = new Settings()) {
        this._name = name;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'learningpaths', `=${name}`);
    }

    /**
     * Get the learning path data.
     * @param {String|Number} revision The positive integer or GUID that refers to a specific revision to fetch. If not supplied, the latest revision will be fetched.
     * @returns {Promise} A promise that, when resolved, yields a learningPathModel representing the learning path.
     */
    getInfo(revision) {
        const params = {};
        if(revision) {
            params.revision = revision;
        }
        return this._plug.withParams(params).get()
            .then((r) => r.json()).then(modelParser.createParser(learningPathModel));
    }

    /**
     * Update the contents of the learning path
     * @param {Object} content The content fields to update
     * @param {String} content.title The new title of the learning path.
     * @param {String} [content.summary] The new summary of the learning path. If not supplied, the summary is cleared.
     * @param {String} [content.category] The new category of the learning path. If not supplied, the category is cleared.
     * @param {Array} [content.pageIds] An array of page IDs that represents the new orderde set of pages in the learning path. If not supplied, the pages are cleared.
     * @param {Date|String} [editTime=now] Current learning path's edit timestamp, or the string 'now' bypass concurrent edit check.
     * @returns {Promise} A promise that, when resolved, yields a learningPathModel representing the updated learning path.
     */
    update(content, editTime = 'now') {
        if(!content) {
            return Promise.reject('The content parameter must be supplied to update a learning path');
        }
        if(!content.title || typeof content.title !== 'string' || content.title === '') {
            return Promise.reject('The title parameter must be supplied, and must be a non-empty string.');
        }
        let xmlData = `<title>${utility.escapeHTML(content.title)}</title>`;
        if(content.summary) {
            if(typeof content.summary !== 'string') {
                return Promise.reject('The summary parameter must be a string');
            }
            xmlData += `<summary>${utility.escapeHTML(content.summary)}</summary>`;
        }
        if(content.category) {
            if(typeof content.category !== 'string') {
                return Promise.reject('The summary parameter must be a string');
            }
            xmlData += `<category>${utility.escapeHTML(content.category)}</category>`;
        }
        if(content.pageIds) {
            if(!Array.isArray(content.pageIds)) {
                return Promise.reject('The pages parameter must be an array');
            }
            xmlData += content.pageIds.reduce((acc, id) => acc + `<pages>${id}</pages>`, xmlData);
        }
        const reqBody = `<learningpath>${xmlData}</learningpath>`;
        return this._plug.withParam('edittime', editTime).post(reqBody, utility.xmlRequestType)
            .then((r) => r.json()).then(modelParser.createParser(learningPathModel));
    }

    /**
     * Remove the learning path.
     * @returns {Promise} A promise that, when resolved, indicates successful removal of the learning path.
     */
    remove() {
        return this._plug.delete();
    }

    /**
     * Clone the learning path, and give it the specified name.
     * @param {String} newName The new name for the learning path clone.
     * @returns {Promise} A promise that, when resolved, yields a learningPathModel containing the information about the cloned learning path.
     */
    clone(newName) {
        if(typeof newName !== 'string' || newName === '') {
            return Promise.reject('The new name for the clone must be a non-empty string.');
        }
        return this._plug.at('clone').withParam('name', newName).post(null, utility.textRequestType)
            .then((r) => r.json()).then(modelParser.createParser(learningPathModel));
    }

    /**
     * Revert the Learning Path to a specific revision.
     * @param {String|Number} revision The positive integer or GUID that refers to a specific revision to revert to.
     * @param {Date|String} [editTime=now] The previous revision's edit timestamp. Defaults to "now" to bypass concurrent edit check.
     * @returns {Promise} A Promise that, when resolved, yields a learningPathModel that represents the state of the learning path after the revert has completed.
     */
    revertToRevision(revision, editTime = 'now') {
        if(!revision) {
            return Promise.reject(new Error('The revision parameter is required'));
        }
        return this._plug.at('revert').withParams({ torevision: revision, edittime: editTime }).post()
            .then((r) => r.json()).then(modelParser.createParser(learningPathModel));
    }

    /**
     * Add a page to the learning path
     * @param {Number} pageId The numeric ID of the page to add to the Learning Path.
     * @param {Date|String} [editTime=now] The previous revision's edit timestamp. Defaults to "now" to bypass concurrent edit check.
     * @returns {Promise} A Promise that, when resolved, returns a pageModel representing the page that was added.
     */
    addPage(pageId, editTime = 'now') {
        return this._plug.at('pages', pageId).withParam('edittime', editTime).post()
            .then((r) => r.json()).then(modelParser.createParser(pageModel));
    }

    /**
     * Remove a page from a learning path
     * @param {Number} pageId The numeric ID of the page to remove from the Learning Path.
     * @param {Date|String} [editTime=now] The previous revision's edit timestamp. Defaults to "now" to bypass concurrent edit check.
     * @returns {Promise} A Promise that, when resolved, indicates that the page was successfully removed.
     */
    removePage(pageId, editTime = 'now') {
        return this._plug.at('pages', pageId).withParam('edittime', editTime).delete();
    }

    /**
     * Change the index of a page in a learning path
     * @param {Number} pageId The numeric ID of the page that is the target of the reorder operation.
     * @param {Number} [afterId=0] The page id after which this page should be placed. A value of 0 will place it at the beginning.
     * @param {Date|String} [editTime=now] The previous revision's edit timestamp. Defaults to "now" to bypass concurrent edit check.
     * @returns {Promise} A Promise that, when resolved, yields a learningPathModel representing the learning path after a successful page reorder.
     */
    reorderPage(pageId, afterId = 0, editTime = 'now') {
        return this._plug.at('pages', pageId, 'order').withParams({ edittime: editTime, afterid: afterId }).post()
            .then((r) => r.json()).then(modelParser.createParser(learningPathModel));
    }
}
export class LearningPathManager {

    /**
     * Create a new LearningPathManager
     * @param {Settings} settings The martian settings to direct the Learning Path API calls.
     */
    constructor(settings = new Settings()) {
        this.settings = settings;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'learningpaths');
    }

    /**
     * Get information for all of the site learning paths.
     * @returns {Promise} A Promise that, when resolved, yields a learningPathsModel containing the information of all of the learning paths.
     */
    getLearningPaths() {
        return this._plug.get().then((r) => r.json()).then(modelParser.createParser(learningPathsModel));
    }

    /**
     * Create a new learning path
     * @param {Object} data The data parameters for the new Learning Path.
     * @param {String} data.name The string ID for the new Learning Path.
     * @param {String} data.title The title for the new Learning Path.
     * @param {String} [data.summary] A brief description for the new Learning Path.
     * @param {String} [data.category] The category to put the learning path in.
     * @returns {Promise} A Promise that, when resolved, yields a learningPathModel containing the information for the new learning path.
     */
    createLearningPath(data) {
        if(!data) {
            return Promise.reject(new Error('Unable to create a learning path without data.'));
        }
        if(!data.name || typeof data.name !== 'string' || data.name === '') {
            return Promise.reject(new Error('The `name` parameter must be supplied, and must be a non-empty string.'));
        }
        if(!data.title || typeof data.title !== 'string' || data.title === '') {
            return Promise.reject(new Error('The `title` parameter must be supplied, and must be a non-empty string.'));
        }
        if(data.summary) {
            if(typeof data.summary !== 'string') {
                return Promise.reject(new Error('The `summary` parameter must be a string.'));
            }
        }
        if(data.category) {
            if(typeof data.category !== 'string') {
                return Promise.reject(new Error('The `category` parameter must be a string.'));
            }
        }
        return this._plug.withParams(data).post().then((r) => r.json()).then(modelParser.createParser(learningPathModel));
    }

    /**
     * Get a list of all of the categories used amongst all learning paths.
     * @returns {Promise} A Promise that, when resolved, yields an object containing the list of all of the learning path categories.
     */
    getCategories() {
        return this._plug.at('categories').get().then((r) => r.json())
            .then(modelParser.createParser(learningPathCategoriesModel));
    }

    /**
     * Get a {@see LearningPath} instance based on the name identifier
     * @param {String} name The name for the learning path object to create.
     * @returns {LearningPath} A LearningPath instance that provides API access to a single learning path.
     */
    getLearningPath(name) {
        return new LearningPath(name, this.settings);
    }
}
