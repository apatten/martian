import { userModel } from './user.model.js';
import { pageModel } from './page.model.js';

export const fileModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@revision', name: 'revision', transform: 'number' },
    { field: '@res-id', name: 'resId', transform: 'number' },
    { field: '@href', name: 'href' },
    { field: '@res-is-head', name: 'resIsHead', transform: 'boolean' },
    { field: '@res-is-deleted', name: 'resIsDeleted', transform: 'boolean' },
    { field: '@res-rev-is-head', name: 'resRevIsHead', transform: 'boolean' },
    { field: '@res-contents-id', name: 'resContentsId', transform: 'number' },
    { field: 'date.created', name: 'dateCreated', transform: 'date' },
    { field: 'description' },
    { field: 'filename' },
    { field: 'location' },
    {
        field: 'contents',
        transform: [
            { field: '@type', name: 'type' },
            { field: '@size', name: 'size', transform: 'number' },
            { field: '@href', name: 'href' },
            { field: '@height', name: 'height', transform: 'number' },
            { field: '@width', name: 'width', transform: 'number' }
        ]
    },
    { field: 'user.createdby', name: 'userCreatedBy', transform: userModel },
    { field: 'page.parent', name: 'pageParent', transform: pageModel }
];
