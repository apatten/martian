import { userModel } from './user.model.js';

export const userListModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@querycount', name: 'queryCount', transform: 'number' },
    { field: '@totalcount', name: 'totalCount', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: 'user', name: 'users', isArray: true, transform: userModel }
];
