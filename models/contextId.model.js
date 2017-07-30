export const contextIdModel = {
    preProcessor(data) {
        if(data.context) {
            return data.context;
        }
        return data;
    },
    model: [
        { field: 'description' },
        { field: 'id' }
    ]
};
