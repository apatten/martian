export const healthReportModel = [
    { field: 'count', transform: 'number' },
    { field: 'querycount', name: 'queryCount', transform: 'number' },
    {
        field: 'inspections',
        isArray: true,
        transform: [
            { field: '@severity', name: 'severity' },
            { field: '@type', name: 'type' },
            { field: 'message' },
            {
                field: 'page',
                transform: [
                    { field: '@uri', name: 'uri' },
                    { field: '@id', name: 'id', transform: 'number' },
                    { field: 'article' }
                ]
            }
        ]
    }
];
