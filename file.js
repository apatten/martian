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
import { Settings } from './lib/settings';
import { utility } from './lib/utility';
import { modelParser } from './lib/modelParser';
import { fileModel } from './models/file.model';
import { fileRevisionsModel } from './models/fileRevisions.model';

/**
 * A class for working with file attachments within the MindTouch site.
 */
export class File {

    /**
     * Construct a new File object.
     * @param {Number} id - The resource ID of the file.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id, settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'files', id);
    }

    /**
     * Get the file attachment information.
     * @returns {Promise.<fileModel>} - A Promise that, when resolved, yields a {@link fileModel} containing the attachment information.
     */
    getInfo() {
        let fileModelParser = modelParser.createParser(fileModel);
        return this._plug.at('info').get().then(fileModelParser);
    }

    /**
     * Get the revision list of the file attachment.
     * @returns {Promise.<fileRevisionsModel>} - A Promise that, when resolved, yields a {@link fileRevisionsModel} containing the revision listing.
     */
    getRevisions() {
        return this._plug.at('revisions').get().then(fileRevisionsModel.parse);
    }

    /**
     * Set the description for the file.
     * @param {String} description - The new file description.
     * @returns {Promise.<fileModel>} - A Promise that, when resolved, yields a {@link fileModel} containing the file information.
     */
    setDescription(description) {
        let fileModelParser = modelParser.createParser(fileModel);
        return this._plug.at('description').put(description, utility.textRequestType).then(fileModelParser);
    }

    /**
     * Delete the file from the MindTouch site.
     * @returns {Promise} - A Promise that, when resolved, indicates a successful file deletion.
     */
    delete() {
        return this._plug.delete();
    }
}
