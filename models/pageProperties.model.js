import { pagePropertyModel } from './pageProperty.model.js';

export const pagePropertiesModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: 'property', name: 'properties', isArray: true, transform: pagePropertyModel }
];
