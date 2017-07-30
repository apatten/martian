export const webWidgetsModel = [
    { field: '@active', name: 'active', transform: 'boolean' },
    { field: '@date', name: 'date', transform: 'date' },
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@type', name: 'type' },
    { field: 'host' },
    { field: 'name' },
    { field: 'token' },
    { field: 'arguments' },
    {
        field: 'code',
        transform: [
            { field: '#text', name: 'text' },
            { field: '@format', name: 'format' },
            { field: '@id', name: 'id' }
        ]
    }
];
