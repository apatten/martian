import { fileModel } from './file.model.js';

export const pageFilesModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@offset', name: 'offset', transform: 'number' },
    { field: '@totalcount', name: 'totalCount', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: 'file', name: 'files', isArray: true, transform: fileModel }
];
