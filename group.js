import { Plug } from '/mindtouch-http.js/plug.js';
import { utility } from './lib/utility.js';
import { Settings } from './lib/settings.js';
import { modelParser } from './lib/modelParser.js';
import { groupModel } from './models/group.model.js';
import { groupListModel } from './models/groupList.model.js';
import { userListModel } from './models/userList.model.js';
import { apiErrorModel } from './models/apiError.model.js';

/**
 * A class for managing a single group of users.
 */
export class Group {
    /**
     * Construct a new Group object.
     * @param {Number|String} id - The integer group ID, or the group name string.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id, settings = new Settings()) {
        if (!id) {
            throw new Error('A group ID must be supplied');
        }
        this._id = utility.getResourceId(id);
        this._groupPlug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'groups', this._id);
        this._errorParser = modelParser.createParser(apiErrorModel);
    }

    /**
     * Get the group information.
     * @returns {Promise.<groupModel>} - A Promise that, when resolved, yields a {@link groupModel} containing the group information.
     */
    getInfo() {
        return this._groupPlug
            .get()
            .then(r => r.json())
            .then(modelParser.createParser(groupModel));
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
        return this._groupPlug
            .at('users')
            .withParams(options)
            .get()
            .then(r => r.json())
            .then(modelParser.createParser(userListModel));
    }

    /**
     * Remove given member from a group
     * @param {Number|String} userId - either an integer user ID, "current", or the username of the user to remove from the group.
     * @returns {Promise} A Promise that, when resolved, yields a groupModel containing information about the group that the user was removed from.
     */
    removeUser(userId) {
        return this._groupPlug
            .at('users', utility.getResourceId(userId, 'current'))
            .delete()
            .catch(err => Promise.reject(this._errorParser(err)))
            .then(r => r.json())
            .then(modelParser.createParser(groupModel));
    }

    /**
     * Remove the group from the site
     * @returns {Promise} A Promise that, when resolved, indicates the group was deleted successfully.
     */
    delete() {
        return this._groupPlug.delete();
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
    constructor(settings = new Settings()) {
        this.plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'groups');
        this.settings = settings;
    }

    /**
     * Get the listing of all of the groups defined on the site.
     * @param {Object} options - The options to direct the fetching of the groups
     * @param {String} options.nameFilter - Search for groups by name or part of a name
     * @param {Number} options.authProvider - Return groups belonging to given authentication service id
     * @param {Number|String} options.limit - Maximum number of items to retrieve. Must be a positive number or 'all' to retrieve all items. (default: 100)
     * @param {Number} options.offset - Number of items to skip. Must be a positive number or 0 to not skip any. (default: 0)
     * @param {String} options.sortBy - Sort field. Prefix value with '-' to sort descending. default: No sorting. Must be one of 'id', 'name', 'role', 'service'
     * @returns {Promise.<groupListModel>} - A Promise that, when resolved, yields a {@link groupListModel} containing the group listing.
     */
    getGroupList(options = {}) {
        const params = {};
        if ('nameFilter' in options) {
            if (typeof options.nameFilter !== 'string') {
                return Promise.reject(new Error('The group name filter must be a string'));
            }
            if (options.nameFilter !== '') {
                params.groupnamefilter = options.nameFilter;
            }
        }
        if ('authProvider' in options) {
            if (typeof options.authProvider !== 'number') {
                return Promise.reject(new Error('The auth provider ID must be a number'));
            }
            params.authprovider = options.authProvider;
        }
        if ('limit' in options) {
            if (typeof options.limit !== 'number' && options.limit !== 'all') {
                return Promise.reject(new Error('The limit parameter must be a number or "all"'));
            }
            params.limit = options.limit;
        }
        if ('offset' in options) {
            if (typeof options.offset !== 'number') {
                return Promise.reject(new Error('The offset parameter must be a number'));
            }
            params.offset = options.offset;
        }
        if ('sortBy' in options) {
            if (typeof options.sortBy !== 'string') {
                return Promise.reject(new Error('The sortBy option must be a string'));
            }
            const validSortParams = ['id', 'name', 'role', 'service', '-id', '-name', '-role', '-service'];
            if (!validSortParams.includes(options.sortBy)) {
                return Promise.reject(new Error(`The sortBy option must be one of ${validSortParams.join(', ')}`));
            }
            params.sortby = options.sortBy;
        }
        return this.plug
            .withParams(params)
            .get()
            .then(r => r.json())
            .then(modelParser.createParser(groupListModel));
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
