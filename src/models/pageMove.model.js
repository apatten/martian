import modelHelper from './modelHelper';
import pageModel from './page.model';
let pageMoveModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: obj['@count'],
            pages: []
        };
        if('page' in obj) {
            let pages = Array.isArray(obj.page) ? obj.page : [ obj.page ];
            pages.forEach((page) => {
                parsed.pages.push(pageModel.parse(page));
            });
        }
        return parsed;
    }
};
export default pageMoveModel;
