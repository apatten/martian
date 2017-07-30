import { pageModel } from './page.model.js';

export const searchModel = [
    { field: '@ranking', name: 'ranking' },
    { field: '@queryid', name: 'queryId', transform: 'number' },
    { field: '@sessionid', name: 'sessionId' },
    { field: '@querycount', name: 'queryCount', transform: 'number' },
    { field: '@count.recommendations', name: 'recommendationCount', transform: 'number' },
    { field: '@count', name: 'count', transform: 'number' },
    { field: 'parsedQuery' },
    {
        field: 'result',
        name: 'results',
        isArray: true,
        transform: [
            { field: 'author' },
            { field: 'content' },
            { field: 'date.modified', name: 'dateModified', transform: 'date' },
            { field: 'id', transform: 'number' },
            { field: 'mime' },
            { field: 'rank', transform: 'number' },
            { field: 'title' },
            { field: 'type' },
            { field: 'uri' },
            { field: 'uri.track', name: 'uriTrack' },
            { field: 'page', transform: pageModel },
            { field: 'preview' },
            {
                field: 'tag',
                name: 'tags',
                transform(value) {
                    if(value) {
                        return value.split('\n');
                    }
                }
            }
        ]
    },
    {
        field: 'summary',
        transform: [
            { field: '@path', name: 'path' },
            {
                field: 'results',
                isArray: true,
                transform: [
                    { field: '@path', name: 'path' },
                    { field: '@count', name: 'count', transform: 'number' },
                    { field: '@title', name: 'title' }
                ]
            }
        ]
    },
    { field: 'page', name: 'pages', isArray: true, transform: pageModel }
];
