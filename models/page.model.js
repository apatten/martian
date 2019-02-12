import { pageRatingModel } from './pageRating.model.js';
import { userModel } from './user.model.js';
import { permissionsModel } from './permissions.model.js';

const pageModel = [
    { field: '@id', name: 'id', transform: 'number' },
    { field: 'title' },
    { field: '@guid', name: 'guid' },
    { field: 'uri.ui', name: 'uri' },
    { field: '@href', name: 'href' },
    { field: '@state', name: 'state' },
    { field: '@draft.state', name: 'draftState' },
    { field: 'article' },
    { field: 'language' },
    { field: 'namespace' },
    { field: 'language.effective', name: 'languageEffective' },
    { field: 'timeuuid' },
    { field: ['path', '#text'] },
    { field: ['path', '@type'], name: 'pathType' },
    { field: ['path', '@seo'], name: 'pathSeo', transform: 'boolean' },
    { field: 'restriction' },
    { field: '@revision', name: 'revision', transform: 'number' },
    {
        field: 'path.original',
        name: 'originalPath',
        transform: val => {
            if (val) {
                return decodeURIComponent(val);
            }
        }
    },
    { field: '@deleted', name: 'deleted', transform: 'boolean' },
    { field: '@publish', name: 'publish', transform: 'boolean' },
    { field: '@unpublish', name: 'unpublish', transform: 'boolean' },
    { field: '@deactivate', name: 'deactivate', transform: 'boolean' },
    { field: '@virtual', name: 'virtual', transform: 'boolean' },
    { field: '@subpages', name: 'hasSubpages', transform: 'boolean' },
    { field: '@files', name: 'files', transform: 'number' },
    { field: '@terminal', name: 'terminal', transform: 'boolean' },
    { field: 'overview' },
    { field: 'user.author', name: 'userAuthor', transform: userModel },
    { field: 'date.created', name: 'dateCreated', transform: 'date' },
    { field: 'date.modified', name: 'dateModified', transform: 'date' },
    { field: 'date.edited', name: 'dateEdited', transform: 'date' },
    { field: ['revisions', '@count'], name: 'revisionCount', transform: 'number' },
    { field: ['comments', '@count'], name: 'commentCount', transform: 'number' },
    { field: ['permissions', 'permissions.page'], name: 'permissions', transform: permissionsModel },
    { field: ['security', 'permissions.effective'], name: 'effectivePermissions', transform: permissionsModel },
    {
        field: 'rating',
        constructTransform(rating) {
            if (typeof rating === 'object' && rating !== null) {
                return pageRatingModel;
            }
        }
    },
    {
        field: 'metrics',
        transform: [
            { field: 'metric.charcount', name: 'charCount', transform: 'number' },
            { field: 'metric.views', name: 'views', transform: 'number' }
        ]
    },
    {
        field: ['tags', 'tag'],
        isArray: true,
        transform: [
            { field: '@href', name: 'href' },
            { field: '@id', name: 'id', transform: 'number' },
            { field: '@value', name: 'value' },
            { field: 'title' },
            { field: 'type' },
            { field: 'uri' }
        ]
    }
];
pageModel.push({ field: 'page.parent', name: 'pageParent', transform: pageModel });
pageModel.push({ field: 'draft', transform: pageModel });
export { pageModel };
