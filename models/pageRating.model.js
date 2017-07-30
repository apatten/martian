export const pageRatingModel = [
    { field: '@date', name: 'date', transform: 'date' },
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@seated.count', name: 'seatedCount', transform: 'number' },
    { field: '@unseated.count', name: 'unseatedCount', transform: 'number' },
    { field: '@anonymous.count', name: 'anonymousCount', transform: 'number' },
    { field: '@score', name: 'score', transform: 'number' },
    { field: '@seated.score', name: 'seatedScore', transform: 'number' },
    { field: '@unseated.score', name: 'unseatedScore', transform: 'number' },
    { field: '@anonymous.score', name: 'anonymousScore', transform: 'number' },
    { field: '@score.trend', name: 'scoreTrend', transform: 'number' },
    { field: '@seated.score.trend', name: 'seatedScoreTrend', transform: 'number' },
    { field: '@unseated.score.trend', name: 'unseatedScoreTrend', transform: 'number' },
    {
        field: 'user.ratedby',
        name: 'userRatedBy',
        transform: [
            { field: '@id', name: 'id', transform: 'number' },
            { field: '@score', name: 'score', transform: 'number' },
            { field: '@date', name: 'date', transform: 'date' },
            { field: '@href', name: 'href' },
            { field: '@seated', name: 'seated', transform: 'boolean' }
        ]
    }
];
