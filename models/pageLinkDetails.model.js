import { pageModel } from './page.model.js';
import { fileModel } from './file.model.js';

export const pageLinkDetailsModel = [
    { field: 'count', transform: 'number' },
    { field: 'querycount', name: 'queryCount', transform: 'number' },
    {
        field: 'pages',
        isArray: true,
        transform: [
            {
                field: 'links',
                isArray: true,
                transform: [
                    { field: '@sequence', name: 'sequence', transform: 'number' },
                    { field: '@isredirect', name: 'isRedirect', transform: 'boolean' },
                    { field: '@isbroken', name: 'isBroken', transform: 'boolean' },
                    { field: 'class' },
                    { field: 'href' },
                    { field: 'rel' },
                    { field: 'text' },
                    { field: 'type' },
                    { field: ['destination', 'page'], name: 'destinationPage', transform: pageModel },
                    { field: ['destination', 'file'], name: 'destinationFile', transform: fileModel }
                ]
            },
            { field: 'page', transform: pageModel }
        ]
    }
];
