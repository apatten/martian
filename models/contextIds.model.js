import {modelHelper} from './modelHelper';
let contextIdsModel = {
    parse(data) {
        if(data === '') {
            data = `{"context": []}`; // eslint-disable-line quotes
        }
        let obj = modelHelper.fromJson(data);
        let parsed = {
            context: []
        };
        let contexts = Array.isArray(obj.context) ? obj.context : [ obj.context ];
        contexts.forEach((c) => {
            parsed.context.push(c);
        });
        return parsed;
    }
};
export {contextIdsModel};
