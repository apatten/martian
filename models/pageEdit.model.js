import modelHelper from './modelHelper';
import pageModel from './page.model';
let pageEditModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            status: obj['@status'],
            page: pageModel.parse(obj.page)
        };
        if('page.base' in obj) {
            parsed.pageBase = pageModel.parse(obj['page.base']);
        }
        if('page.overwritten' in obj) {
            parsed.pageOverwritten = pageModel.parse(obj['page.overwritten']);
        }
        return parsed;
    }
};
export default pageEditModel;
