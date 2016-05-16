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
import { Plug } from 'mindtouch-http';
import { PageFileBase } from './pageFileBase';
import { Settings } from './lib/settings';

/**
 * A class for managing a file attachment on an unpublished page.
 */
export class DraftFile extends PageFileBase {

    /**
     * Construct a new DraftFile
     * @param {Number|String} [pageId='home'] - The ID of the unpublished page.
     * @param {String} filename - The filename of the file to manage.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(pageId, filename, settings = new Settings()) {
        super(pageId, filename);
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'drafts', this._pageId, 'files', this._filename);
    }
}
