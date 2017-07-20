/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { apiErrorModel } from './models/apiError.model.js';
import { healthReportModel } from './models/healthReport.model.js';

const _errorParser = modelParser.createParser(apiErrorModel);

export class SiteReports {
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'site', 'reports');
    }

    /**
     * Get the site health report.
     * @param {Object} [options] - Optons to filter the results returned.
     * @param {Array} [options.analyzers] - An array of analyzers to include in the report (all analyzers included if none specified)
     * @param {Array} [options.severities] - An array of severity levels to include in the report (all error levels if none specified)
     * @returns {Promise.<Object>} - A Promise that will be resolved with the site health report data, or rejected with an error specifying the reason for rejection.
     */
    getSiteHealth(options = {}) {
        const params = {};
        if(options.analyzers) {
            if(!Array.isArray(options.analyzers)) {
                return Promise.reject(new Error('The `analyzers` option must be an array of analyzers'));
            }
            params.analyzers = options.analyzers.join(',');
        }
        if(options.severities) {
            if(!Array.isArray(options.severities)) {
                return Promise.reject(new Error('The `severities` option must be an array of analyzers'));
            }
            params.severity = options.severities.join(',');
        }
        return this._plug.at('sitehealth').withParams(params).get()
            .catch((err) => Promise.reject(_errorParser(err)))
            .then((r) => r.json())
            .then(modelParser.createParser(healthReportModel));
    }
}
