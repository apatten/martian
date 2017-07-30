import { pageModel } from './page.model.js';
import { userModel } from './user.model.js';

export const pageCommentModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@href', name: 'href' },
    {
        field: 'content',
        transform: [
            { field: '@type', name: 'type' },
            { field: '@href', name: 'href' },
            { field: '#text', name: 'text' }
        ]
    },
    { field: 'date.posted', name: 'postedDate', transform: 'date' },
    { field: 'date.edited', name: 'editedDate', transform: 'date' },
    { field: 'date.deleted', name: 'deletedDate', transform: 'date' },
    { field: 'number', transform: 'number' },
    { field: 'page.parent', name: 'pageParent', transform: pageModel },
    { field: 'title' },
    { field: 'uri.ui', name: 'uri' },
    { field: 'user.createdby', name: 'userCreatedBy', transform: userModel },
    { field: 'user.deletedby', name: 'userDeletedBy', transform: userModel },
    { field: 'user.editedby', name: 'userEditedBy', transform: userModel }
];
