export const reportLogsModel = [
    {
        field: 'log',
        name: 'logs',
        isArray: true,
        transform: [
            { field: '@complete', name: 'complete', transform: 'boolean' },
            { field: 'modified', transform: 'date' },
            { field: 'month' },
            { field: 'name' }
        ]
    }
];

