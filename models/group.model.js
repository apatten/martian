import { permissionsModel } from './permissions.model.js';

export const groupModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: 'groupname', name: 'groupName' },
    { field: 'permissions.group', name: 'groupPermissions', transform: permissionsModel },
    {
        field: 'users',
        transform: [{ field: '@count', name: 'count' }, { field: '@href', name: 'href' }]
    }
];
