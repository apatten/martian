import modelHelper from './modelHelper';
import pageModel from './page.model';
let contextMapModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            default: modelHelper.getBool(obj['@default']),
            exists: modelHelper.getBool(obj['@exists']),
            description: obj.description,
            id: obj.id,
            language: obj.language
        };
        if('page' in obj) {
            parsed.page = pageModel.parse(obj.page);
        }
        if('pageid' in obj) {
            let id = modelHelper.getString(obj.pageid);
            parsed.pageId = parseInt(id, 10);
        }
        return parsed;
    }
};
export default contextMapModel;
