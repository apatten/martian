export const siteTagsModelGet = [
    { field: '@count', name: 'count', transform: 'number' },
    {
        field: 'tag',
        name: 'tags',
        isArray: true,
        transform: [
            { field: '@value', name: 'value' },
            { field: '@id', name: 'id', transform: 'number' },
            { field: '@href', name: 'href' },
            { field: 'title' },
            { field: 'type' },
            { field: 'uri' }
        ]
    }
];

export const siteTagsModelPost = [
    {
        field: 'skipped-pageids',
        name: 'skippedPageIds',
        transform(value) {
            if(typeof value === 'string') {
                return value.split(',');
            }
            return [];
        }
    }
];
