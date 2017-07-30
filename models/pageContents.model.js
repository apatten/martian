export let pageContentsModel = [
    { field: '@type', name: 'type' },
    { field: '@title', name: 'title' },
    { field: '@unsafe', name: 'unsafe', transform: 'boolean' },
    { field: '@draft', name: 'draft', transform: 'boolean' },
    { field: 'head' },
    { field: 'tail' },
    {
        field: 'body',
        transform(body) {
            return Array.isArray(body) ? body[0] : body;
        }
    },
    {
        field: 'body',
        name: 'targets',
        transform(body) {
            const targets = [];
            if(Array.isArray(body)) {
                for(let i = 1; i < body.length; i++) {
                    targets.push({ [body[i]['@target']]: body[i]['#text'] });
                }
            }
            return targets;
        }
    }
];
