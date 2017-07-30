import { webWidgetsModel } from './webWidgets.model.js';

export const webWidgetsListModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: 'web-widget', name: 'webWidgets', isArray: true, transform: webWidgetsModel }
];
