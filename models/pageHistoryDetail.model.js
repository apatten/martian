import { eventModel } from './event.model.js';

export const pageHistoryDetailModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: 'event', name: 'events', isArray: true, transform: eventModel }
];
