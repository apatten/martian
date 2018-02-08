export const recommendedTagsModelParser = [
    {
        field: 'tag',
        name: 'tags',
        isArray: true,
        transform: [{ field: '@value', name: 'tag' }]
    }
];
