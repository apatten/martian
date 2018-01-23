export const linkToCaseLinkList = [
    { field: 'count', transform: 'number' },
    {
        field: [ 'linkdata', 'link' ],
        name: 'linkData',
        isArray: true,
        transform: [
            { field: 'caseid', name: 'caseId' },
            { field: 'linkcreatoruserid', name: 'linkCreatorUserId', transform: 'number' },
            { field: 'linkdate', name: 'linkDate', transform: 'date' },
            { field: 'pageid', name: 'pageId', transform: 'number' }
        ]
    },
    { field: 'total', transform: 'number' }
];
