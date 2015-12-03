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
import Plug from './plug';
import settings from './settings';
import userModel from './models/user.model';
import userListModel from './models/userList.model';
let userPlug = new Plug().at('@api', 'deki', 'users');
export default class User {
    static getCurrentUser() {
        return userPlug.withHost(settings.get('host')).at('current').get().then(userModel.parse);
    }
    static getUsers() {
        return userPlug.withHost(settings.get('host')).get().then(userListModel.parse);
    }
    static searchUsers(constraints) {
        return userPlug.withHost(settings.get('host')).at('search').withParams(constraints).get().then(userListModel.parse);
    }
    constructor(id = 'current') {
        if(typeof id === 'string' && id !== 'current') {
            id = `=${encodeURIComponent(encodeURIComponent(id))}`;
        }
        this._id = id;
        this._plug = userPlug.withHost(settings.get('host')).at(this._id);
    }
    getInfo() {
        return this._plug.get().then(userModel.parse);
    }
}
