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
import {utility} from './lib/utility';
import {userActivityModel} from './models/userActivity.model';
import {eventListModel} from './models/eventList.model';
import {eventDetailModel} from './models/eventDetail.model';
export class UserEvents {
    constructor(settings) {
        this.settings = settings;
        this.plug = new Plug(settings).at('@api', 'deki', 'events');
    }
    getActivity(userToken) {
        return this.plug.at('support-agent', userToken).get().then(userActivityModel.parse);
    }
    getHistory(userId) {
        return this.plug.at('user-page', utility.getResourceId(userId, 'current')).get().then(eventListModel.parse);
    }
    getHistoryDetail(userId, detailId) {
        return this.plug.at('user-page', utility.getResourceId(userId, 'current'), detailId).get().then(eventDetailModel.parse);
    }
    logSearch(userId, eventData) {
        return this.plug.at('search', utility.getResourceId(userId, 'current')).post(JSON.stringify(eventData), utility.jsonRequestType);
    }
}
