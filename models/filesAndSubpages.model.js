import { subpagesModel } from './subpages.model.js';
import { pageFilesModel } from './pageFiles.model.js';

export const filesAndSubpagesModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: '@guid', name: 'guid' },
    { field: '@draft.state', name: 'draftState' },
    { field: '@href', name: 'href' },
    { field: '@deleted', name: 'deleted', transform: 'boolean' },
    { field: 'date.created', name: 'dateCreated', transform: 'date' },
    { field: 'language' },
    { field: [ 'path', '#text' ] },
    { field: 'title' },
    { field: 'uri.ui', name: 'uri' },
    { field: 'files', name: 'filesInfo', transform: pageFilesModel },
    { field: 'subpages', name: 'subpagesInfo', transform: subpagesModel }
];
