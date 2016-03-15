import {modelHelper} from './modelHelper';
import {pageModel} from './page.model';
export let userActivityModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            datetime: modelHelper.getDate(obj['@datetime']),
            id: obj['@id'],
            journaled: modelHelper.getBool(obj['@journaled']),
            language: obj['@language'],
            type: obj['@type'],
            version: modelHelper.getInt(obj['@version'])
        };
        return parsed;
    }
};
