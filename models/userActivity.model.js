import { eventModel } from './event.model.js';

export const userActivityModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@upto', name: 'upTo' },
    { field: '@since', name: 'since' },
    { field: 'event', name: 'events', isArray: true, transform: eventModel }
];
