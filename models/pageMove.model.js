import { pageModel } from './page.model.js';

export const pageMoveModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: 'page', name: 'pages', isArray: true, transform: pageModel }
];
