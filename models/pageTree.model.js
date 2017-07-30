export const pageTreeModel = {
    preProcessor(data) {
        if(data.page) {
            return data.page;
        }
    },
    model: [
        { field: '@id', name: 'id', transform: 'number' },
        { field: '@guid', name: 'guid' },
        { field: '@draft.state', name: 'draftState' },
        { field: '@href', name: 'href' },
        { field: '@deleted', name: 'deleted', transform: 'boolean' },
        { field: 'date.created', name: 'dateCreated', transform: 'date' },
        { field: 'namespace', name: 'namespace' },
        { field: [ 'path', '#text' ], name: 'path' },
        { field: 'title', name: 'title' },
        { field: 'uri.ui', name: 'uri' }
    ]
};
pageTreeModel.model.push({
    field: 'subpages',
    isArray: true,
    constructTransform(val) {
        if(val.page) {
            return pageTreeModel;
        }
    }
});
