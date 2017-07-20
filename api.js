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

/**
 * A class for validating HTTP requests to the MindTouch site API.
 */
export class Api {

    /**
     * Construct a new API object.
     * @param {Settings} [settings] The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki');
    }

    /**
     * Validate HTTP request
     * @returns {Promise} A Promise that, when resolved, indicates a successful HTTP request.
     */
    http() {
        return this._plug.at('http').get();
    }

    /**
     * Validate HTTP request
     * @returns {Promise} A Promise that, when resolved, indicates a successful F1 HTTP request.
     */
    f1() {
        return this._plug.at('f1').get();
    }
}
