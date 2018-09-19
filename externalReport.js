import { Plug } from './plug.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { externalReportModel } from './models/externalReport.model.js';
import { externalReportListModel } from './models/externalReportList.model.js';
import { externalReportExternalUriModel } from './models/externalReportExtenalUri.model.js';
import { valid, required, string } from './lib/validation.js';

export class ExternalReport {
    /**
     * Construct a ExternalReport object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'site', 'external-reports');
    }

    /**
     * Return all external reports
     * @returns {Promise.<Array>} - A Promise that will be resolved with an array of external reports, or rejected with an error specifying the reason for rejection.
     */
    getExternalReports() {
        return this._plug
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(externalReportListModel));
    }

    /**
     * Return an external report
     * @param {Number} id External Report Id
     * @returns {Promise.<Object>} - A Promise that will be resolved with an external report, or rejected with an error specifying the reason for rejection.
     */
    getExternalReport(id) {
        if (!id || !Number.isInteger(id)) {
            return Promise.reject(new Error('Must submit a numeric id of an external report.'));
        }
        return this._plug
            .get(id)
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(externalReportModel));
    }

    /**
     * Return an external report external uri
     * @param {Number} id External Report Id
     * @returns {Promise.<Object>} - A Promise that will be resolved with an external report uri, or rejected with an error specifying the reason for rejection.
     */
    getExternalReportExternalUri(id) {
        if (!id || !Number.isInteger(id)) {
            return Promise.reject(new Error('Must submit a numeric id of an external report.'));
        }
        return this._plug
            .at(id, 'external-uri')
            .get()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(externalReportExternalUriModel));
    }

    /**
     * Create an external report
     * @param {Object} externalReport - an external report
     * @returns {Promise.<Object>} - external report
     */
    createExternalReport(externalReport) {
        if (!externalReport) {
            return Promise.reject(new Error('Unable to create an external report without data.'));
        }
        const validationErrors = valid.object(externalReport, required('url', string()), required('name', string()));
        if (validationErrors.length > 0) {
            return Promise.reject(new Error(validationErrors));
        }
        return this._plug
            .post(externalReport)
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(externalReportModel));
    }

    /**
     * Update an external report
     * @param {Object} externalReport - an external report
     * @returns {Promise.<Object>} - external report
     */
    updateExternalReport(externalReport) {
        if (!externalReport) {
            return Promise.reject(new Error('Unable to create an external report without data.'));
        }
        const validationErrors = valid.object(externalReport, required('url', string()), required('name', string()));
        if (validationErrors.length > 0) {
            return Promise.reject(new Error(validationErrors));
        }
        return this._plug
            .put(externalReport.id, externalReport)
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(externalReportModel));
    }

    /**
     * Delete an external report
     * @param {Number} id - an id of an external report
     * @returns {void}
     */
    deleteExternalReport(id) {
        if (!id || !Number.isInteger(id)) {
            return Promise.reject(new Error('Must submit a numeric id of an external report.'));
        }
        return this._plug
            .at(id)
            .delete()
            .catch(err => Promise.reject(err))
            .then(r => r.json())
            .then(modelParser.createParser(externalReportModel));
    }
}
