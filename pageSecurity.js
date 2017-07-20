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
import { Plug } from 'mindtouch-http.js/plug.js';
import { Settings } from './lib/settings.js';
import { utility } from './lib/utility.js';
import { modelParser } from './lib/modelParser.js';
import { pageSecurityModel } from './models/pageSecurity.model.js';

function _validateGrantsArray(grants) {
    if(!Array.isArray(grants)) {
        return [ false, 'The specified grants must be an array' ];
    }
    for(const grant of grants) {
        const userDefined = typeof grant.user !== 'undefined';
        const groupDefined = typeof grant.group !== 'undefined';
        if((userDefined && groupDefined) || (!userDefined && !groupDefined)) {
            return [ false, 'The grant must only define a single user or group, but not both.' ];
        }
        if(userDefined && typeof grant.user !== 'string' && typeof grant.user !== 'number') {
            return [ false, 'The grant user parameter must be a numeric ID or an username' ];
        } else if(groupDefined && typeof grant.group !== 'string' && typeof grant.group !== 'number') {
            return [ false, 'The grant group parameter must be a numeric ID or an username' ];
        }
        if(typeof grant.role !== 'string') {
            return [ false, 'The grant role must be defined and must be a string.' ];
        }
    }
    return [ true, 'success' ];
}
function _getGrantsXml(grants, modifier) {
    let tagName = 'grants';
    if(modifier) {
        tagName += `.${modifier}`;
    }
    const grantsXml = grants.map((grant) => {
        let userOrGroup;
        if(grant.user) {
            userOrGroup = 'user';
        } else {
            userOrGroup = 'group';
        }
        const idOrName = grant[userOrGroup];
        let userOrGroupXml;
        if(typeof idOrName === 'number') {
            userOrGroupXml = `<${userOrGroup} id="${idOrName}"></${userOrGroup}>`;
        } else {
            userOrGroupXml = `<${userOrGroup}><${userOrGroup}name>${idOrName}</${userOrGroup}name></${userOrGroup}>`;
        }
        const roleXml = `<permissions><role>${grant.role}</role></permissions>`;
        return `<grant>${userOrGroupXml}${roleXml}</grant>`;
    }).join('');
    return `<${tagName}>${grantsXml}</${tagName}>`;
}
function _getPageRestrictionXml(restriction) {
    if(!restriction) {
        return '';
    }
    return `<permissions.page><restriction>${restriction}</restriction></permissions.page>`;
}

/**
 * A class for manipulating the restrictions and grants on a page.
 */
export class PageSecurity {

    /**
     * Create a new PageSecurity object.
     * @param {Number|String} [id=home] The numeric page ID or page path string for the page.
     * @param {Settings} [settings] The martian Settings used to direct the API requests for the PageSecurity instance.
     */
    constructor(id = 'home', settings = new Settings()) {
        this._plug = new Plug(settings.host, settings.plugConfig).at('@api', 'deki', 'pages', utility.getResourceId(id, 'home'), 'security');
    }

    /**
     * Gets the page's security info.
     * @returns {Promise} A Promise that, when resolved, yields a securityModel containing the page security information.
     */
    get() {
        return this._plug.get().then((r) => r.json()).then(modelParser.createParser(pageSecurityModel));
    }

    /**
     * Resets the page's security.
     * @returns {Promise} A Promise that, when resolved, indicates the page's security was successfully reset.
     */
    reset() {
        return this._plug.delete();
    }

    /**
     * Set the page security by adding and removing grants.
     * @param {Object} options Options to direct the setting of the security information.
     * @param {String} [options.cascade] A string indicating the behavior of the operation to child pages. Must be one of "none", "delta" or "absolute".
     * @param {Object} options.pageRestriction The restriction to set for the page.
     * @param {Object[]} [options.grants] An array of information about the grants to set.
     * @param {String|Number} [options.grants.user] The username or numeric ID of the user receiving the grant.
     * @param {String|Number} [options.grants.group] The group name or numeric ID of the group receiving the grant.
     * @param {String} [options.grants.role] The name of the grant to set for specified user.
     * @returns {Promise} A Promise that, when resolved, yields a pageSecurityModel containing the new security information.
     */
    set({ cascade = 'none', pageRestriction, grants } = {}) {
        if(typeof pageRestriction !== 'string') {
            return Promise.reject(new Error('The pageRestriction parameter must be provided and must be a string.'));
        }
        let grantsXml = '';
        if(grants) {
            const [ validGrants, err ] = _validateGrantsArray(grants);
            if(!validGrants) {
                return Promise.reject(new Error(err));
            }
            grantsXml = _getGrantsXml(grants);
        }
        const restrictionXml = _getPageRestrictionXml(pageRestriction);
        const securityRequest = `<security>${restrictionXml}${grantsXml}</security>`;
        return this._plug.withParams({ cascade }).put(securityRequest, utility.xmlRequestType)
            .then((r) => r.json()).then(modelParser.createParser(pageSecurityModel));
    }

    /**
     * Modify page security by adding and removing grants.
     * @param {Object} options Options to direct the security modification.
     * @param {String} [options.cascade] A string indicating the behavior of the operation to child pages. Must be one of "none" or "delta".
     * @param {String} [options.pageRestriction] The restriction to set for the page.
     * @param {Object[]} [options.grantsAdded] An array of grant information to add to the current grants for the page.
     * @param {String|Number} [options.grantsAdded.user] The username or numeric ID of the user receiving the grant.
     * @param {String|Number} [options.grantsAdded.group] The group name or numeric ID of the group receiving the grant.
     * @param {String} [options.grantsAdded.role] The name of the grant to set for specified user or group.
     * @param {Object[]} [options.grantsRemoved] An array of grant information to remove from the current grants for the page.
     * @param {String|Number} [options.grantsRemoved.user] The username or numeric ID of the user losing the grant.
     * @param {String|Number} [options.grantsRemoved.group] The group name or numeric ID of the group losing the grant.
     * @param {String} [options.grantsRemoved.role] The name of the grant to revoke for specified user or group.
     * @returns {Promise} A Promise that, when resolved, yields a pageSecurityModel containing the new security information.
     */
    update({ cascade = 'none', pageRestriction, grantsAdded, grantsRemoved } = {}) {
        let addedXml = '';
        if(grantsAdded) {
            const [ valid, err ] = _validateGrantsArray(grantsAdded);
            if(!valid) {
                return Promise.reject(new Error(err));
            }
            addedXml = _getGrantsXml(grantsAdded, 'added');
        }
        let removedXml = '';
        if(grantsRemoved) {
            const [ valid, err ] = _validateGrantsArray(grantsRemoved);
            if(!valid) {
                return Promise.reject(new Error(err));
            }
            removedXml = _getGrantsXml(grantsRemoved, 'removed');
        }
        const restrictionXml = _getPageRestrictionXml(pageRestriction);
        const securityRequest = `<security>${restrictionXml}${addedXml}${removedXml}</security>`;
        return this._plug.withParams({ cascade }).post(securityRequest, utility.xmlRequestType)
            .then((r) => r.json()).then(modelParser.createParser(pageSecurityModel));
    }
}
