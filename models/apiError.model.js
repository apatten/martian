export const apiErrorModel = {
    preProcessor(data) {
        if('responseText' in data) {
            try {
                data.errorInfo = JSON.parse(data.responseText);
            } catch(e) {
                data.errorText = data.responseText;
            }
            delete data.responseText;
        }
        return data;
    },
    model: [
        { field: 'status' },
        { field: 'message' },
        {
            field: 'errorInfo',
            name: 'info',
            transform: [
                { field: [ 'arguments', 'argument' ], name: 'arguments', isArray: true },
                { field: 'exception' },
                { field: 'message' },
                { field: 'resource' },
                { field: 'data' }
            ]
        },
        { field: 'errorText' }
    ]
};
