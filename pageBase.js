import { progressPlugFactory } from 'mindtouch-http/progressPlugFactory.js';
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

function _handleVirtualPage(error) {
    if(error.status === 404 && error.responseText) {
        let responseJson = JSON.parse(error.responseText);
        if(responseJson['@virtual'] === 'true') {
            let pageModelParser = modelParser.createParser(pageModel);
            return Promise.resolve(pageModelParser(responseJson));
        }
    }
    throw error;
}
export class PageBase {
    constructor(id) {
        if(this.constructor.name === 'PageBase') {
            throw new TypeError('PageBase must not be constructed directly.  Use one of Page() or Draft()');
        }
        this._id = utility.getResourceId(id, 'home');
    }
    getFullInfo() {
        let pageModelParser = modelParser.createParser(pageModel);
        return this._plug.get().then((r) => r.json()).then(pageModelParser).catch(_handleVirtualPage);
    }
    getContents(params) {
        let pageContentsModelParser = modelParser.createParser(pageContentsModel);
        return this._plug.at('contents').withParams(params).get().then((r) => r.json()).then(pageContentsModelParser);
    }
    setContents(contents, params = {}) {
        if(typeof contents !== 'string') {
            return Promise.reject(new Error('Contents should be string.'));
        }
        let contentsParams = {
            edittime: 'now'
        };
        Object.keys(params).forEach((key) => {
            contentsParams[key] = params[key];
        });
        let pageEditModelParser = modelParser.createParser(pageEditModel);
        return this._plug.at('contents').withParams(contentsParams).post(contents, utility.textRequestType).then((r) => r.json()).then(pageEditModelParser);
    }
    getFiles(params = {}) {
        let pageFilesModelParser = modelParser.createParser(pageFilesModel);
        return this._plug.at('files').withParams(params).get().then((r) => r.json()).then(pageFilesModelParser);
    }
    attachFile(file, filename, progress) {
        const progressPlug = new progressPlugFactory.ProgressPlug(this._plug.url, this._settings.plugConfig);
        const progressInfo = { callback: progress, size: file.size };
        return progressPlug.at('files', filename).put(file, file.type, progressInfo).then((r) => JSON.parse(r.responseText)).then(modelParser.createParser(fileModel));
    }
    getOverview() {
        return this._plug.at('overview').get().then((r) => r.json()).then(modelParser.createParser(pageOverviewModel));
    }
    setOverview(options = {}) {
        if(!('body' in options)) {
            return Promise.reject(new Error('No overview body was supplied'));
        }
        let request = `<overview>${options.body}</overview>`;
        return this._plug.at('overview').put(request, utility.xmlRequestType);
    }
    getTags() {
        let pageTagsModelParser = modelParser.createParser(pageTagsModel);
        return this._plug.at('tags').get().then((r) => r.json()).then(pageTagsModelParser);
    }
    getDiff() {
        throw new Error('Page.getDiff() is not implemented');
    }
    getRelated() {
        let relatedPagesModelParser = modelParser.createParser(relatedPagesModel);
        return this._plug.at('related').get().then((r) => r.json()).then(relatedPagesModelParser);
    }
}
