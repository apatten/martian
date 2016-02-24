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
import {groupModel} from './models/group.model';
import {groupListModel} from './models/groupList.model';
import {userListModel} from './models/userList.model';
export class Group {
    constructor(id, settings) {
        if(!id) {
            throw new Error('A group ID must be supplied');
        }
        this._id = utility.getResourceId(id);
        this._groupPlug = new Plug(settings).at('@api', 'deki', 'groups', this._id);
    }
    getInfo() {
        return this._groupPlug.get().then(groupModel.parse);
    }
    getUsers(options) {
        return this._groupPlug.at('users').withParams(options).get().then(userListModel.parse);
    }
}
export class GroupManager {
    constructor(settings) {
        this.plug = new Plug(settings).at('@api', 'deki', 'groups');
        this.settings = settings;
    }
    getGroupList() {
        return this.plug.get().then(groupListModel.parse);
    }
    getGroup(id) {
        return new Group(id, this.settings);
    }
}
