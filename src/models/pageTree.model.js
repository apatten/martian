import modelHelper from './modelHelper';
import pageModel from './page.model';
let pageTreeModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = pageModel.parse(obj.page);
        return parsed;
    }
};
export default pageTreeModel;
