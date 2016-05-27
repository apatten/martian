import { Plug } from 'mindtouch-http';
import { Settings } from './lib/settings';
import { modelParser } from './lib/modelParser';
import { learningPathModel } from './models/learningPath.model';
import { pageModel } from './models/page.model';

let maxSummaryCount = 500;
function getSaveXML(data) {
    let template = `<title>${data.title}</title>
        <summary>${data.summary}</summary>
        <category>${data.category}</category>`;
    if(data.pages && Array.isArray(data.pages)) {
        data.pages.forEach((page) => {
            template = `${template}
                <pages>${page.id}</pages>`;
        });
    }
    template = `<learningpath>${template}</learningpath>`;
    return template;
}
export class LearningPath {

    // Constructor
    constructor(name, settings = new Settings()) {
        this._name = name;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'learningpaths', `${name}`);
    }
    getInfo() {
        let learningPathModelParser = modelParser.createParser(learningPathModel);
        return this._plug.get().then((r) => r.json()).then(learningPathModelParser);
    }

    // learning path operations
    update(content) {
        if(content.summary && content.summary.length > maxSummaryCount) {
            content.summary = content.summary.substring(0, maxSummaryCount);
        }
        let learningPathModelParser = modelParser.createParser(learningPathModel);

        // Do this without mustache
        let XMLData = getSaveXML(content);
        return this._plug.at(`=${this._name}`).withParam('edittime', content.edittime).post(XMLData, 'application/xml').then((r) => r.json()).then(learningPathModelParser);
    }
    remove() {
        return this._plug.at(`=${this._name}`).delete();
    }

    // Page operations
    addPage(pageId, editTime) {
        let pageModelParser = modelParser.createParser(pageModel);
        return this._plug.at(`=${this._name}`, 'pages', pageId).withParam('edittime', editTime).post().then((r) => r.json()).then(pageModelParser);
    }
    removePage(pageId, editTime) {
        return this._plug.at(`=${this._name}`, 'pages', pageId).withParam('edittime', editTime).delete();
    }
    reorderPage(pageId, afterId, editTime) {
        let learningPathModelParser = modelParser.createParser(learningPathModel);
        return this._plug.at(`=${this._name}`, 'pages', pageId, 'order').withParams({ edittime: editTime, afterId: afterId }).post().then((r) => r.json()).then(learningPathModelParser);
    }
}
export class LearningPathManager {
    constructor(settings = new Settings()) {
        this.settings = settings;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'learningpaths');
    }
    getLearningPaths() {
        let learningPathModelParser = modelParser.createParser(learningPathModel);
        return this._plug.get().then((r) => r.json()).then(learningPathModelParser);
    }
    getLearningPath(name) {
        return new LearningPath(name, this.settings);
    }
    create(data) {
        if(data.summary.length > maxSummaryCount) {
            data.summary = data.summary.substring(0, maxSummaryCount);
        }
        let learningPathModelParser = modelParser.createParser(learningPathModel);
        return this._plug.withParams(data).post().then((r) => r.json()).then(learningPathModelParser);
    }
}
