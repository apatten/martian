export const permissionsModel = [
    {
        field: [ 'operations', '#text' ],
        transform(value) {
            let result = [];
            if(typeof value === 'string') {
                result = value.split(',');
            }
            return result;
        }
    },
    {
        field: 'role',
        transform(value) {
            let roleObj = {};
            if(typeof value === 'string') {
                roleObj.name = value;
            } else if(value && typeof value === 'object') {
                if('#text' in value) {
                    roleObj.name = value['#text'];
                }
                if('@id' in value) {
                    roleObj.id = parseInt(value['@id'], 10);
                }
                if('@href' in value) {
                    roleObj.href = value['@href'];
                }
            }
            return roleObj;
        }
    },
    {
        field: 'restriction', transform: [
            { field: '@id', name: 'id', transform: 'number' },
            { field: '#text', name: 'name' }
        ]
    }
];
