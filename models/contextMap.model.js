import { pageModel } from './page.model.js';

export const contextMapModel = [
    { field: '@default', name: 'default', transform: 'boolean' },
    { field: '@exists', name: 'exists', transform: 'boolean' },
    { field: 'description' },
    { field: 'id' },
    { field: 'language' },
    { field: 'page', transform: pageModel },
    { field: [ 'pageid', '#text' ], transform: 'number' }
];
