import modelHelper from './modelHelper';
import pageModel from './page.model';
let pageEditModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            status: obj['@status'],
            page: pageModel.parse(obj.page)
        };
        return parsed;
    }
};
export default pageEditModel;
