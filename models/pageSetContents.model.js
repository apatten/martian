import modelHelper from './modelHelper';
import pageModel from './page.model';
let pageSetContents = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        return pageModel.parse(obj.page);
    }
};
export default pageSetContents;
