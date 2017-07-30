import { pageModel } from './page.model.js';

export const pageFindModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@totalcount', name: 'totalCount', transform: 'number' },
    { field: 'page', name: 'pages', isArray: true, transform: pageModel }
];
