export const localizationsModel = [
    { field: '@lang', name: 'lang' },
    {
        field: 'localization',
        name: 'localizations',
        isArray: true,
        transform: [
            { field: '@resource', name: 'resource' },
            { field: '@missing', name: 'missing', transform: 'boolean' },
            { field: '#text', name: 'text' }
        ]
    }
];
