export const siteActivityModel = [
    { field: '@type', name: 'type' },
    {
        field: 'entry',
        name: 'entries',
        isArray: true,
        transform: [
            { field: '@date', name: 'date', transform: 'date' },
            { field: 'pages.created', name: 'pagesCreated', transform: 'number' },
            { field: 'pages.deleted', name: 'pagesDeleted', transform: 'number' },
            { field: 'pages.edited', name: 'pagesEdited', transform: 'number' },
            { field: 'pages.total', name: 'pagesTotal', transform: 'number' },
            { field: 'users.created', name: 'usersCreated', transform: 'number' },
            { field: 'users.total', name: 'usersTotal', transform: 'number' }
        ]
    }
];
