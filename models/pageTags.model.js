export const pageTagsModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@href', name: 'href' },
    {
        field: 'tag',
        name: 'tags',
        isArray: true,
        transform: [
            { field: '@id', name: 'id', transform: 'number' },
            { field: '@value', name: 'value' },
            { field: '@href', name: 'href' },
            { field: 'title' },
            { field: 'type' },
            { field: 'uri' }
        ]
    }
];
