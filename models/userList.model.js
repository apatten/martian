import modelHelper from './modelHelper';
import userModel from './user.model';
let userListModel = {
    parse: (data) => {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: obj['@count'],
            users: []
        };
        modelHelper.addIfDefined(obj['@querycount'], 'querycount', parsed);
        modelHelper.addIfDefined(obj['@totalcount'], 'totalcount', parsed);
        modelHelper.addIfDefined(obj['@href'], 'href', parsed);
        if('user' in obj) {
            let users = Array.isArray(obj.user) ? obj.user : [ obj.user ];
            users.forEach((user) => {
                parsed.users.push(userModel.parse(user));
            });
        }
        return parsed;
    }
};
export default userListModel;
