import modelHelper from './modelHelper';
import pageModel from './page.model';
let pagePropertyModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            revision: obj['@revision'],
            name: obj['@name'],
            href: obj['@href'],
            dateModified: modelHelper.getDate(obj['date.modified'])
        };
        modelHelper.addIfDefined(obj.page, 'page', parsed, pageModel);
        return parsed;
    }
};
export default pagePropertyModel;
