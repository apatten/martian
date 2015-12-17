import modelHelper from './modelHelper';
import contextMapModel from './contextMap.model';
let contextMapsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            contextMap: [],
            languages: Array.isArray(obj.languages.language) ? obj.languages : [ obj.languages.language ]
        };
        if('contextmap' in obj) {
            let maps = Array.isArray(obj.contextmap) ? obj.contextmap : [ obj.contextmap ];
            maps.forEach((map) => {
                parsed.contextMap.push(contextMapModel.parse(map));
            });
        }
        return parsed;
    }
};
export default contextMapsModel;
