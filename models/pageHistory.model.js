import { eventModel } from './event.model.js';
import { userModel } from './user.model.js';

export const pageHistoryModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@upto', name: 'upTo' },
    { field: '@since', name: 'since' },
    {
        field: 'summary',
        isArray: true,
        transform: [
            { field: '@id', name: 'id' },
            { field: '@datetime', name: 'datetime', transform: 'date' },
            { field: '@count', name: 'count', transform: 'number' },
            { field: '@detailid', name: 'detailId' },
            { field: '@journaled', name: 'journaled', transform: 'boolean' },
            { field: '@diffable', name: 'diffable', transform: 'boolean' },
            { field: '@uri.detail', name: 'detailUri' },
            { field: '@uri.hierarchy', name: 'hierarchyUri' },
            { field: 'event', transform: eventModel },
            {
                field: 'page',
                transform: [{ field: '@id', name: 'id', transform: 'number' }, { field: 'path' }]
            },
            { field: ['users', 'user'], name: 'users', isArray: true, transform: userModel }
        ]
    }
];
