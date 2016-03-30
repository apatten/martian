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

/**
 * A class for managing a single group of users.
 */
export class Group {

    /**
     * Construct a new Group object.
     * @param {Number|String} id - The integer group ID, or the group name string.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id, settings) {
        if(!id) {
            throw new Error('A group ID must be supplied');
        }
        this._id = utility.getResourceId(id);
        this._groupPlug = new Plug(settings).at('@api', 'deki', 'groups', this._id);
    }

    /**
     * Get the group information.
     * @returns {Promise.<groupModel>} - A Promise that, when resolved, yields a {@link groupModel} containing the group information.
     */
    getInfo() {
        return this._groupPlug.get().then(groupModel.parse);
    }

    /**
     * Get a list of optionally-filtered group users.
     * @param {Object} options - The filtering options for fetching the listing.
     * @param {String} [options.usernamefilter] - Search for users by name or part of a name.
     * @param {Number} [options.offset=0] - Number of items to skip. Must be a positive number or 0 to not skip any.
     * @param {Number|String} [options.limit=100] - Maximum number of items to retrieve. Must be a positive number or 'all' to retrieve all items.
     * @param {Boolean} [options.activatedfilter] - Search for users by their active status.
     * @param {String} [options.rolefilter] - Search for users by a role name.
     * @param {String} [options.sortby] - Sort field. Prefix value with '-' to sort descending. Valid values are: `id`, `username`, `nick`, `email`, `fullname`, `date.lastlogin`, `status`, `role`, `service`
     * @returns {Promise.<userListModel>} - A Promise that, when resolved, yields a {@link userListModel} with the users listing.
     */
    getUsers(options) {
        return this._groupPlug.at('users').withParams(options).get().then(userListModel.parse);
    }
}

/**
 * A class to manage the groups defined on the MindTouch site.
 */
export class GroupManager {

    /**
     * Construct a GroupManager object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings) {
        this.plug = new Plug(settings).at('@api', 'deki', 'groups');
        this.settings = settings;
    }

    /**
     * Get the listing of all of the groups defined on the site.
     * @returns {Promise.<groupListModel>} - A Promise that, when resolved, yields a {@link groupListModel} containing the group listing.
     */
    getGroupList() {
        return this.plug.get().then(groupListModel.parse);
    }

    /**
     * Get a Group object based on ID.
     * @param {Number|String} id - The integer group ID, or the group name string.
     * @returns {Group} - A new {@link Group} object for managing the group.
     */
    getGroup(id) {
        return new Group(id, this.settings);
    }
}
