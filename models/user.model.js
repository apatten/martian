import { permissionsModel } from './permissions.model.js';
import { groupModel } from './group.model.js';

export const userModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@anonymous', name: 'anonymous', transform: 'boolean' },
    { field: '@wikiid', name: 'wikiId' },
    { field: '@href', name: 'href' },
    { field: 'date.created', name: 'dateCreated', transform: 'date' },
    { field: 'date.lastlogin', name: 'lastLoginDate', transform: 'date' },
    { field: 'email' },
    { field: 'fullname' },
    { field: ['license.seat', '#text'], name: 'seated', transform: 'boolean' },
    { field: ['license.seat', '@owner'], name: 'siteOwner', transform: 'boolean' },
    { field: 'nick' },
    { field: ['password', '@exists'], name: 'passwordExists', transform: 'boolean' },
    { field: 'status' },
    { field: 'username' },
    { field: 'permissions.user', name: 'userPermissions', transform: permissionsModel },
    { field: ['groups', 'group'], name: 'groups', isArray: true, transform: groupModel }
];
