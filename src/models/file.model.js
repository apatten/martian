import modelHelper from './modelHelper';
import userModel from './user.model';
import pageModel from './page.model';
let fileModel = {
    parse: (data) => {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            id: parseInt(obj['@id']),
            revision: parseInt(obj['@revision']),
            resId: parseInt(obj['@res-id']),
            href: obj['@href'],
            resIsHead: modelHelper.getBool(obj['@res-is-head']),
            resIsDeleted: modelHelper.getBool(obj['@res-is-deleted']),
            resRevIsDeleted: modelHelper.getBool(obj['@res-rev-is-head']),
            resContentsId: parseInt(obj['@res-contents-id']),
            dateCreated: modelHelper.getDate(obj['date.created']),
            description: obj.description,
            filename: obj.filename,
            contents: {
                type: obj.contents['@type'],
                size: parseInt(obj.contents['@size']),
                href: obj.contents['@href']
            }
        };
        if('user.createdby' in obj) {
            parsed.userCreatedBy = userModel.parse(obj['user.createdby']);
        }
        if('page.parent' in obj) {
            parsed.pageParent = pageModel.parse(obj['page.parent']);
        }
        return parsed;
    }
};
export default fileModel;
