import { pageModel } from './page.model.js';

export const subpagesModel = [
    { field: '@totalcount', name: 'totalCount', transform: 'number' },
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@href', name: 'href' },
    {
        field: 'page.subpage',
        name: 'subpages',
        isArray: true,
        transform: pageModel
    }
];
