import { pageModel } from './page.model.js';

export const popularPagesModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: 'page', name: 'pages', isArray: 'true', transform: pageModel }
];
