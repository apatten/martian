import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { utility } from './lib/utility.js';
import { apiErrorModel } from './models/apiError.model.js';
import { siteJobModel, siteJobsModel } from './models/siteJob.model.js';

const _errorParser = modelParser.createParser(apiErrorModel);

export class SiteJob {

    /**
     * Create a new SiteJob
     * @param {String} jobId The GUID job ID.
     * @param {Settings} [settings] The martian settings that will direct the requests for this instance.
     */
    constructor(jobId, settings = new Settings()) {
        if(!jobId || typeof jobId !== 'string') {
            throw new Error('The job ID must be supplied as a GUID string.');
        }
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'site', 'jobs', jobId);
    }

    /**
     *
     */
    getStatus() {
        return this._plug.at('status').get()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(siteJobModel));
    }

    /**
     * Cancel the site job.
     * @returns {Promise} A promise that, when resolved, indicates the job was successfully cancelled.
     */
    cancel() {
        return this._plug.at('cancel').post()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(siteJobModel));
    }
}

export class SiteJobManager {

    /**
     * Create a new SiteJobManager object.
     * @param {Settings} [settings] - The martian settings that will direct the requests for this instance.
     */
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'site', 'jobs');
    }

    /**
     * Schedules a site export.
     * @param {Object} options - Options to configure the export job.
     * @param {String} [options.email] - The email address to notify when the job completes. Required if a URL is not supplied.
     * @param {String} [options.url] - The URL to notify when the job completes. Required if an email address is not supplied.
     * @param {Object[]} [options.pages] - An array of objects with information about the pages to export.
     * @param {Number} [options.pages[].id] - The ID of a page to export. Required if the path is not supplied.
     * @param {String} [options.pages[].path] - The path of a page to export. Required if the ID is not supplied.
     * @param {Boolean} [options.pages[].includeSubpages] - Idicates whether or not to export the subpages of the specified page.
     * @returns {Promise.<Object>} - A Promise that will be resolved with the scheduled job info, or rejected with an error specifying the reason for rejection.
     */
    scheduleExport(options) {
        if(!options) {
            return Promise.reject(new Error('The export options must be supplied'));
        }
        let notificationSupplied = false;
        if('email' in options) {
            notificationSupplied = true;
        }
        if('url' in options) {
            notificationSupplied = true;
        }
        if(notificationSupplied === false) {
            return Promise.reject(new Error('Notification email and url are missing. Need an email or url to notify when the job completes.'));
        }
        if('pages' in options) {
            if(!Array.isArray(options.pages)) {
                return Promise.reject('The pages option must be an array.');
            }
        } else {
            return Promise.reject('One or more pages must be specified for export.');
        }
        const pagesElements = options.pages.reduce((acc, page) => {
            let element = '<page';
            if(page.id) {
                element += ` id="${page.id}"`;
            }
            if('includeSubpages' in page) {
                element += ` includesubpages="${page.includeSubpages}"`;
            }
            element += '>';
            if(page.path) {
                element += `<path>${page.path}</path>`;
            }
            element += '</page>';
            return acc + element;
        }, '');
        let postData = '<job><notification>';
        if(options.email) {
            postData += `<email>${options.email}</email>`;
        }
        if(options.url) {
            postData += `<url>${options.url}</url>`;
        }
        postData += '</notification>';
        postData += `<pages>${pagesElements}</pages>`;
        postData += '</job>';
        return this._plug.at('export').post(postData, utility.xmlRequestType)
            .then((r) => r.json())
            .then(modelParser.createParser(siteJobModel));
    }

    /**
     * Schedules a site import
     * @param {Object} options - Options to configure the import job.
     * @param {Boolean} [options.dryRun=false] - Perform a dry run of the import to diagnose potential content problems.
     * @param {String} [options.email] - The email address to notify when the job completes. Required if a URL is not supplied.
     * @param {String} [options.url] - The URL to notify when the job completes. Required if an email address is not supplied.
     * @param {String} options.archiveUrl - The URL pointing to the archive to import.
     * @returns {Promise.<Object>} - A Promise that will be resolved with the scheduled job info, or rejected with an error specifying the reason for rejection.
     */
    scheduleImport(options) {
        if(!options) {
            return Promise.reject(new Error('The export options must be supplied'));
        }
        let notificationSupplied = false;
        if('email' in options) {
            notificationSupplied = true;
        }
        if('url' in options) {
            notificationSupplied = true;
        }
        if(notificationSupplied === false) {
            return Promise.reject(new Error('Notification email and url are missing. Need an email or url to notify when the job completes.'));
        }
        if(typeof options.archiveUrl !== 'string' || options.archiveUrl === '') {
            return Promise.reject(new Error('An archive url is required, and must be a non-empty string to perform an import.'));
        }
        let postData = '<job><notification>';
        if(options.email) {
            postData += `<email>${options.email}</email>`;
        }
        if(options.url) {
            postData += `<url>${options.url}</url>`;
        }
        postData += '</notification>';
        postData += `<archive><url>${options.archiveUrl}</url></archive>`;
        postData += '</job>';
        return this._plug.at('import').withParam('dryrun', Boolean(options.dryRun)).post(postData, utility.xmlRequestType)
            .then((r) => r.json())
            .then(modelParser.createParser(siteJobModel));
    }

    /**
     * Gets the job statuses for a site.
     * @returns {Promise.<Object>} - A Promise that will be resolved with the jobs status info, or rejected with an error specifying the reason for rejection.
     */
    getJobsStatuses() {
        return this._plug.at('status').get()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(siteJobsModel));
    }
}
