import { permissionsModel } from './permissions.model.js';
import { userModel } from './user.model.js';

export const pageSecurityModel = [
    { field: '@href', name: 'href' },
    {
        field: [ 'grants', 'grant' ],
        name: 'grants',
        isArray: true,
        transform: [
            { field: 'date.modified', name: 'dateModified', transform: 'date' },
            { field: 'permissions', transform: permissionsModel },
            { field: 'user', transform: userModel },
            { field: 'user.modifiedby', name: 'userModifiedBy', transform: userModel }
        ]
    },
    { field: 'permissions.effective', name: 'effectivePermissions', transform: permissionsModel },
    { field: 'permissions.page', name: 'pagePermissions', transform: permissionsModel },
    { field: 'permissions.revoked', name: 'revokedPermissions', transform: permissionsModel }
];
