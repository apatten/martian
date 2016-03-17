import {modelHelper} from './modelHelper';
import {contextMapModel} from './contextMap.model';
let contextMapsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            contextMap: [],
            languages: modelHelper.getArray(obj.languages.language)
        };
        if('contextmap' in obj) {
            let maps = modelHelper.getArray(obj.contextmap);
            maps.forEach((map) => {
                parsed.contextMap.push(contextMapModel.parse(map));
            });
        }
        return parsed;
    }
};
export {contextMapsModel};
