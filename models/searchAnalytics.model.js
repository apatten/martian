import { pageModel } from './page.model.js';
import { fileModel } from './file.model.js';

export const searchAnalyticsModel = [
    {
        field: 'popular',
        transform: [
            {
                field: 'search',
                isArray: true,
                transform: [
                    { field: 'averageClicksPerSearch', transform: 'number' },
                    { field: 'averagePosition', transform: 'number' },
                    { field: 'hits', transform: 'number' },
                    { field: 'mostRecent', transform: 'date' },
                    { field: 'query' },
                    { field: 'results', transform: 'number' },
                    { field: 'topresult', transform: [
                        { field: 'page', transform: pageModel },
                        { field: 'file', transform: fileModel }
                    ]},
                    { field: 'total', transform: 'number' }
                ]
            }
        ]
    },
    {
        field: 'volume',
        transform: [
            { field: 'clickTotal', transform: 'number' },
            { field: 'clickthroughRate' },
            { field: 'searchTotal', transform: 'number' },
            { field: 'searchesClickedTotal', transform: 'number' },
            {
                field: 'point',
                isArray: true,
                transform: [
                    { field: 'clicks', transform: 'number' },
                    { field: 'date', transform: 'date' },
                    { field: 'total', transform: 'number' }
                ]
            }
        ]
    }
];
