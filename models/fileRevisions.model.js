import { fileModel } from './file.model.js';

export const fileRevisionsModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@totalcount', name: 'totalCount', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: 'file', isArray: true, transform: fileModel }
];
