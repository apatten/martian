import { pageModel } from './page.model.js';
import { fileModel } from './file.model.js';

export const searchAnalyticsQueryModel = [
    {
        field: 'clicks',
        transform: [
            {
                field: 'click',
                isArray: true,
                transform: [
                    { field: 'averagePosition', transform: 'number' },
                    { field: 'hits', transform: 'number' },
                    { field: 'mostRecent', transform: 'date' },
                    { field: 'type' },
                    { field: 'page', transform: pageModel },
                    { field: 'file', transform: fileModel }
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
                    { field: 'searchesClicked', transform: 'number' },
                    { field: 'date', transform: 'date' },
                    { field: 'total', transform: 'number' }
                ]
            }
        ]
    }
];
