import { pageModel } from './page.model.js';

export const learningPathModel = [
    { field: '@name', name: 'name' },
    { field: '@editable', name: 'editable', transform: 'boolean' },
    { field: '@revision', name: 'revision', transform: 'number' },
    { field: 'edittime', name: 'editTime' },
    { field: 'title' },
    { field: 'summary' },
    { field: 'category' },
    { field: 'uri.learningpath', name: 'uri' },
    { field: 'pages', isArray: true, transform: pageModel }
];
