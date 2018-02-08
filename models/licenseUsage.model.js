const helpRequestData = [{ field: '@name', name: 'name' }, { field: '@count', name: 'count', transform: 'number' }];
export const licenseUsageModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@date.start', name: 'startDate', transform: 'apiDate' },
    { field: '@date.expiration', name: 'expirationDate', transform: 'apiDate' },
    { field: '@anually-licensed-help-requests', name: 'annuallyLicensedHelpRequests' },
    {
        field: 'totals',
        isArray: true,
        transform: [
            { field: '@date', name: 'date', transform: 'apiDate' },
            { field: ['custom', 'origin'], name: 'customRequests', isArray: true, transform: helpRequestData },
            { field: ['mt-requests', 'origin'], name: 'mtRequests', isArray: true, transform: helpRequestData }
        ]
    }
];
