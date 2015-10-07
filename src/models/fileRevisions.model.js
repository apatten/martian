import modelHelper from './modelHelper';
import fileModel from './file.model';
let fileRevisionsModel = {
    parse: (data) => {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: obj['@count'],
            totalcount: obj['@totalcount'],
            href: obj['@href']
        };
        if('file' in obj) {
            parsed.file = [];
            let file = Array.isArray(obj.file) ? obj.file : [ obj.file ];
            file.forEach((f) => {
                parsed.file.push(fileModel.parse(f));
            });
        }
        return parsed;
    }
};
export default fileRevisionsModel;
