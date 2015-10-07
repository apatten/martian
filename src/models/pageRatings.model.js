import modelHelper from './modelHelper';
import pageModel from './page.model';
let pageRatingsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: parseInt(obj['@count']),
            href: obj['@href']
        };
        if('page' in obj) {
            parsed.page = [];
            let pageArray = Array.isArray(obj.page) ? obj.page : [ obj.page ];
            pageArray.forEach((page) => {
                parsed.page.push(pageModel.parse(page));
            });
        }
        return parsed;
    }
}
export default pageRatingsModel;
