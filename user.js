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
import {userModel} from './models/user.model';
import {userListModel} from './models/userList.model';
export class User {
    constructor(id = 'current', settings) {
        this._id = utility.getResourceId(id, 'current');
        this._plug = new Plug(settings).at('@api', 'deki', 'users', this._id);
    }
    getInfo() {
        return this._plug.get().then(userModel.parse);
    }
}
export class UserManager {
    constructor(settings) {
        this.settings = settings;
        this.plug = new Plug(settings).at('@api', 'deki', 'users');
    }
    getCurrentUser() {
        return this.plug.at('current').get().then(userModel.parse);
    }
    getUsers() {
        return this.plug.get().then(userListModel.parse);
    }
    searchUsers(constraints) {
        return this.plug.at('search').withParams(constraints).get().then(userListModel.parse);
    }
    getUser(id = 'current') {
        return new User(id, this.settings);
    }
}
