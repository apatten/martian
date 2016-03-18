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
import {Plug} from './lib/plug';
import {contextIdsModel} from './models/contextIds.model';
import {contextIdModel} from './models/contextId.model';
import {contextMapsModel} from './models/contextMaps.model';
import {contextMapModel} from './models/contextMap.model';
export class ContextDefinition {
    constructor(id, settings) {
        if(!id) {
            throw new Error('an ID must be supplied to create a new ContextDefinition');
        }
        this.id = id;
        this.plug = new Plug(settings).at('@api', 'deki', 'contexts', id);
    }
    getInfo() {
        return this.plug.get().then(contextIdModel.parse);
    }
    updateDescription(description = '') {
        let updateRequest = `<context><id>${this.id}</id><description>${description}</description></context>`;
        return this.plug.put(updateRequest, 'application/xml; charset=utf-8').then(contextIdModel.parse);
    }
    delete() {
        return this.plug.delete();
    }
}
export class ContextMap {
    constructor(language, id, settings) {
        if(!id || !language) {
            throw new Error('an ID and language must be supplied to create a new ContextMap');
        }
        this.id = id;
        this.language = language;
        this.plug = new Plug(settings).at('@api', 'deki', 'contextmaps', language, id).withParam('verbose', 'true');
    }
    getInfo() {
        return this.plug.get().then(contextMapModel.parse);
    }
    update(pageId) {
        if(!pageId) {
            return Promise.reject(new Error('a page ID must be supplied in order to update a mapping'));
        }
        let updateRequest = `<contextmap><id>${this.id}</id><pageid>${pageId}</pageid><language>${this.language}</language></contextmap>`;
        return this.plug.put(updateRequest, 'application/xml; charset=utf-8').then(contextMapModel.parse);
    }
    remove() {
        return this.plug.delete();
    }
}
export class ContextIdManager {
    constructor(settings) {
        this.mapsPlug = new Plug(settings).at('@api', 'deki', 'contextmaps').withParam('verbose', 'true');
        this.definitionsPlug = new Plug(settings).at('@api', 'deki', 'contexts');
        this.settings = settings;
    }
    getMaps() {
        return this.mapsPlug.get().then(contextMapsModel.parse);
    }
    getDefinitions() {
        return this.definitionsPlug.get().then(contextIdsModel.parse);
    }
    addDefinition(id, description = '') {
        if(!id) {
            return Promise.reject(new Error('an ID must be supplied to add a definintion'));
        }
        let addRequest = `<contexts><context><id>${id}</id><description>${description}</description></context></contexts>`;
        return this.definitionsPlug.post(addRequest, 'application/xml; charset=utf-8').then(contextIdModel.parse);
    }
    getDefinition(id) {
        return new ContextDefinition(id, this.settings);
    }
    getMap(language, id) {
        return new ContextMap(language, id, this.settings);
    }
}
