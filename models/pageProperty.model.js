import { propertyContentsModel } from './propertyContents.model.js';

export const pagePropertyModel = [
    { field: '@revision', name: 'revision' },
    { field: '@name', name: 'name' },
    { field: '@href', name: 'href' },
    { field: 'date.modified', name: 'dateModified', transform: 'date' },
    { field: 'contents', transform: propertyContentsModel }
];
