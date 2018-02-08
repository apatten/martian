export const webWidgetsModel = [
    { field: '@active', name: 'active', transform: 'boolean' },
    { field: '@date', name: 'date', transform: 'date' },
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@type', name: 'type' },
    { field: '@parentId', name: 'parentId', transform: 'number' },
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
webWidgetsModel.push({ field: ['sub-web-widgets', 'web-widget'], name: 'subwidgets', isArray: true, transform: webWidgetsModel });
