import modelHelper from './modelHelper';
import pageModel from './page.model';
let userModel = {
    parse: function(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            id: parseInt(obj['@id']),
            wikiId: obj['@wikiid'],
            href: obj['@href'],
            dateCreated: modelHelper.getDate(obj['date.created']),
            dateLastLogin: modelHelper.getDate(obj['date.lastlogin']),
            email: obj.email,
            fullname: obj.fullname,
            username: obj.username
        };
        if('page.home' in obj) {
            parsed.pageHome = pageModel.parse(obj['page.home']);
        }
        return parsed;
    }
};
export default userModel;
