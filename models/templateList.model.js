export const templateListModel = [
    { field: '@count', name: 'count', transform: 'number' },
    {
        field: 'template',
        name: 'templates',
        isArray: true,
        transform: [
            { field: 'description' },
            { field: 'id', transform: 'number' },
            { field: 'path' },
            { field: 'title' },
            { field: 'articletype', name: 'articleType' }
        ]
    }
];
