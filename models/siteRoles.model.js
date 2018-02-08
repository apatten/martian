import { permissionsModel } from './permissions.model.js';

export const siteRolesModel = [{ field: 'permissions', isArray: true, transform: permissionsModel }];
