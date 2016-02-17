import {modelHelper} from './modelHelper';
export let permissionsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            operations: modelHelper.getString(obj.operations).split(','),
            role: {
                id: modelHelper.getInt(obj.role['@id']),
                name: modelHelper.getString(obj.role)
            }
        };
        return parsed;
    }
};
