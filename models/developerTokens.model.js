export const developerTokenModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@type', name: 'type' },
    { field: '@date', name: 'date', transform: 'date' },
    { field: 'host' },
    { field: 'key' },
    { field: 'name' },
    { field: 'secret' }
];
export const developerTokensModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: 'developer-token', name: 'developerTokens', isArray: true, transform: developerTokenModel }
];
