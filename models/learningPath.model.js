import { pageModel } from './page.model.js';

export const learningPathModel = [
    { field: 'title' },
    { field: '@name', name: 'name' },
    { field: 'summary' },
    { field: 'pages', isArray: true, transform: pageModel },
    { field: 'edittime', name: 'editTime' },
    { field: 'uri.learningpath', name: 'uri' },
    { field: 'category' }
];
