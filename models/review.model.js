export const reviewModel = [ {
    field: 'article-review',
    name: 'articleReview',
    isArray: true,
    transform: [
        { field: 'initiating-user', name: 'initiatingUser', transform: 'number' },
        { field: 'page-id', name: 'pageId', transform: 'number' },
        { field: 'review-id', name: 'id', transform: 'number' },
        { field: 'started-time', name: 'startedTime', transform: 'date' },
        {
            field: [ 'states', 'state' ],
            isArray: true,
            transform: [
                { field: 'comment' },
                { field: 'completed-by-user', name: 'completedByUser' },
                { field: 'completed-time', name: 'completedTime', transform: 'date' },
                { field: 'created-time', name: 'createdTime', transform: 'date' },
                { field: 'is-final-state', name: 'isFinalState', transform: 'boolean' },
                { field: 'label' },
                { field: 'next-state-id', name: 'nextStateId', transform: 'number' },
                { field: 'on-draft', name: 'onDraft', transform: 'boolean' },
                { field: 'requested-by-user', name: 'requestedByUser' },
                { field: 'requested-of-user', name: 'requestedOfUser' },
                { field: 'requested-of-group', name: 'requestedOfGroup' },
                { field: 'state-id', name: 'stateId', transform: 'number' }
            ]
        }
    ]
} ];
