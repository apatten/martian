import { Plug } from 'mindtouch-http';
import { Settings } from './lib/settings';
import { utility } from './lib/utility';
import { modelParser } from './lib/modelParser';
import { userModel } from './models/user.model';
import { userListModel } from './models/userList.model';

/**
 * A class for managing a MindTouch user.
 */
export class User {

    /**
     * Construct a new User object.
     * @param {Number|String} [id='current'] - The user's numeric ID or username.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(id = 'current', settings = new Settings()) {
        this._id = utility.getResourceId(id, 'current');
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'users', this._id);
    }

    /**
     * Get the user information.
     * @param {Object} params - The various params that provide context to the request
     * @param {Array} params.excludes - elements to exclude from response (ex: ['groups', 'properties'])
     * @returns {Promise.<userModel>} - A Promise that, when resolved, returns a {@link userModel} containing the user information.
     */
    getInfo({ excludes = [] } = {}) {
        let userModelParser = modelParser.createParser(userModel);
        let plug = this._plug;
        if(Array.isArray(excludes) && excludes.length) {
            plug = plug.withParam('exclude', excludes.join());
        }
        return plug.get().then((r) => r.json()).then(userModelParser);
    }
}

/**
 * A class for managing the users on a MindTouch site.
 */
export class UserManager {

    /**
     * Construct a new UserManager object.
     * @param {Settings} [settings] - The {@link Settings} information to use in construction. If not supplied, the default settings are used.
     */
    constructor(settings = new Settings()) {
        this._settings = settings;
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'users');
    }

    /**
     * Get the currently signed-in user.
     * @param {Object} params - The various params that provide context to the request
     * @param {Array} params.excludes - elements to exclude from response (ex: ['groups', 'properties'])
     * @returns {Promise.<userModel>} - A Promise that, when resolved, returns a {@link userModel} containing the current user's information.
     */
    getCurrentUser({
        excludes = []
    } = {}) {
        let userModelParser = modelParser.createParser(userModel);
        let plug = this._plug;
        if(Array.isArray(excludes) && excludes.length) {
            plug = plug.withParam('exclude', excludes.join())
        }
        return plug.at('current').get().then((r) => r.json()).then(userModelParser);
    }

    /**
     * Get all of the users.
     * @returns {Promise.<userListModel>} - A Promise that, when resolved, returns a {@link userListModel} containing the list of users.
     */
    getUsers() {
        let userListModelParser = modelParser.createParser(userListModel);
        return this._plug.get().then((r) => r.json()).then(userListModelParser);
    }

    /**
     * Get a listing of users filtered by the supplied constraints
     * @param {Object} constraints - The various constraints that can be used to filter the user listing.
     * @param {Number} constraints.groupid - Search for users in a specific group
     * @param {String} constraints.fullname - Search for users full name starting with supplied text.
     * @param {Boolean} constraints.active - Search for users by their active status
     * @param {Number} constraints.authprovider - Return users belonging to given authentication service id
     * @param {String} constraints.email - Search for users by name and email or part of a name and email
     * @param {Boolean} constraints.seated - Search for users with or without seats
     * @param {String} constraints.username - Search for users name starting with supplied text
     * @param {Number} constraints.roleid - Search for users of a specific role ID.
     * @param {Number} constraints.limit - Maximum number of items to retrieve. Actual maximum is capped by site setting
     * @returns {Promise.<userListModel>} - A Promise that, when resolved, returns a {@link userListModel} containing the list of found users.
     */
    searchUsers(constraints) {
        let userListModelParser = modelParser.createParser(userListModel);
        return this._plug.at('search').withParams(constraints).get().then((r) => r.json()).then(userListModelParser);
    }

    /**
     * Authenticate a user
     * @param {Object} options - The authentication options.
     * @param {String} options.method - Either 'GET' or 'POST' to direct the use of those forms of the API call.
     * @param {String} options.username - The username of the user to authenticate.
     * @param {String} options.password - The password of the user to authenticate.
     */
    authenticate({ method = 'GET', username, password }) {
        const lowerMethod = method.toLowerCase();
        if(lowerMethod !== 'get' && lowerMethod !== 'post') {
            return Promise.reject(new Error('GET and POST are the only valid methods for user authentication.'));
        }
        const encodedAuth = utility.base64.encode(`${username}:${password}`);
        const authPlug = this._plug.at('authenticate').withHeader('Authorization', `Basic ${encodedAuth}`);
        return authPlug[lowerMethod]().then((r) => r.text());
    }

    /**
     * Get a {@see User} object by ID.
     * @param {Number|String} [id='current'] - The user's numeric ID or username.
     * @returns {User} - The User object corresponding to the supplied ID.
     */
    getUser(id = 'current') {
        return new User(id, this._settings);
    }
}
