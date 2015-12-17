import modelHelper from './modelHelper';
let contextIdModel = {
    parse(data) {
        let parsed = modelHelper.fromJson(data);
        if('context' in parsed) {
            parsed = parsed.context;
        }
        return parsed;
    }
};
export default contextIdModel;
