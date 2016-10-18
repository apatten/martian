import { utility } from './lib/utility';
import { platform } from './lib/platform.js';
import { modelParser } from './lib/modelParser';
import { pageModel } from './models/page.model';
import { pageContentsModel } from './models/pageContents.model';
import { pageTagsModel } from './models/pageTags.model';
import { pageFilesModel } from './models/pageFiles.model';
import { pageEditModel } from './models/pageEdit.model';
import { relatedPagesModel } from './models/relatedPages.model';
import { fileModel } from './models/file.model.js';

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
    attachFile(file, progress) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();  // eslint-disable-line no-undef
            const plug = this._plug.at('files', file.name);
            xhr.open('PUT', plug.url, true);
            xhr.setRequestHeader('Content-Type', file.type);
            plug.headers.forEach(({ header, val }) => {
                xhr.setRequestHeader(header, val);
            });
            xhr.onreadystatechange = function(e) {
                var args = {};
                if(e.target.readyState === 4) {
                    var status = e.target.status;
                    if(status >= 200 && status <= 300) {
                        args = JSON.parse(e.target.responseText);
                        const parser = modelParser.createParser(fileModel);
                        resolve(parser(JSON.parse(e.target.responseText)));
                    } else if(status === 403) {
                        args.message = 'Article.Attach.file.upload.notAllowed';
                    } else {
                        try {
                            args = JSON.parse(e.target.responseText);
                        } catch(err) {
                            args.message = 'System.API.Error.file_upload_error';
                        }
                    }
                }
            };
        });
        /*return this._plug.at('files', file.name)
            .put(platform.fileReader.toBuffer(file), platform.fileReader.getContentType(file))
            .then((r) => r.json)
            .then(modelParser.createParser(fileModel));*/
    }
    getOverview() {
        return this._plug.at('overview').get().then((r) => r.json()).then((overview) => {
            return Promise.resolve({ overview: overview });
        }).catch(() => {
            return Promise.reject('Unable to parse the page overview response');
        });
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
