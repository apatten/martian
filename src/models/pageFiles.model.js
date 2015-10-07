import modelHelper from './modelHelper';
import pageModel from './page.model';
import userModel from './user.model';
import fileModel from './file.model';
let pageFilesModel = {
    parse: function(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: parseInt(obj['@count']),
            offset: parseInt(obj['@offset']),
            totalcount: parseInt(obj['@totalcount']),
            href: obj['@href']
        };
        if('file' in obj) {
            parsed.file = [];
            let files = Array.isArray(obj.file) ? obj.file : [ obj.file ];
            files.forEach((f) => {
                parsed.file.push(fileModel.parse(f));
            });
        }
        return parsed;
    }
};
export default pageFilesModel;
