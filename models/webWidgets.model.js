export const webWidgetsModel = [
    { field: '@active', name: 'active', transform: 'boolean' },
    { field: '@date', name: 'date', transform: 'date' },
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@type', name: 'type' },
    { field: '@date.deleted', name: 'dateDeleted', transform: 'date' },
    {
        field: 'web-widget.parent',
        name: 'parent',
        transform: [{ field: '@id', name: 'id', transform: 'number' }]
    },
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
webWidgetsModel.push({
    field: 'web-widgets',
    name: 'subWidgetInfo',
    transform: [
        { field: '@count', name: 'count', transform: 'number' },
        { field: 'web-widget', name: 'widgets', isArray: true, transform: webWidgetsModel }
    ]
});
