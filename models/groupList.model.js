import { groupModel } from './group.model.js';

export const groupListModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@querycount', name: 'queryCount', transform: 'number' },
    { field: '@totalcount', name: 'totalCount', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: 'group', name: 'groups', isArray: true, transform: groupModel }
];
