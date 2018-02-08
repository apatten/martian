import { contextMapModel } from './contextMap.model.js';

export const contextMapsModel = [
    { field: 'contextmap', name: 'contextMaps', isArray: true, transform: contextMapModel },
    { field: ['languages', 'language'], isArray: true }
];
