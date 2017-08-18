export const searchAnalyticsModel = [
    {
        field: 'popular',
        transform: [
            { 
                field: 'search',
                isArray: true,
                transform: [
                    { field: 'averagePosition', transform: 'number' },
                    { field: 'hits', transform: 'number' },
                    { field: 'mostRecent', transform: 'date' },
                    { field: 'query' },
                    { field: 'results', transform: 'number' },
                    { field: 'topresult', transform: [
                        { field: '@type', name: 'type' },
                        { field: '@hits', name: 'hits', transform: 'number' },
                        { field: 'date.created', name: 'dateCreated', transform: 'date' },
                        { field: [ 'path', '#text' ] },
                        { field: 'title' },
                        { field: 'filename' },
                        { field: [ 'contents', '@href' ], name: 'fileUri' },
                        { field: 'uri.ui', name: 'uri' }
                    ]},
                    { field: 'total', transform: 'number' }
                ]
            }
        ]
    },
    {
        field: 'volume',
        transform: [
            { field: 'clickTotal', transform: 'number' },
            { field: 'clickthroughRate' },
            { field: 'searchTotal', transform: 'number' },
            { 
                field: 'point',
                isArray: true,
                transform: [
                    { field: 'clicks', transform: 'number' },
                    { field: 'date', transform: 'date' },
                    { field: 'total', transform: 'number' }
                ]
            }
        ]
    }
];
