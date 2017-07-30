export const pageSubscriptionsModel = [
    {
        field: 'subscription.page',
        name: 'subscriptions',
        isArray: true,
        transform: [
            { field: '@id', name: 'id', transform: 'number' },
            { field: '@depth', name: 'depth' },
            { field: '@draft', name: 'draft', transform: 'boolean' }
        ]
    }
];
