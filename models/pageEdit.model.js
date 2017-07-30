import { pageModel } from './page.model.js';

export const pageEditModel = [
    { field: '@status', name: 'status' },
    { field: 'page', transform: pageModel },
    { field: 'draft', transform: pageModel },
    { field: 'page.base', name: 'pageBase', transform: pageModel },
    { field: 'page.overwritten', name: 'pageOverwritten', transform: pageModel }
];
