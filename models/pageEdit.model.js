import {modelHelper} from './modelHelper';
import {pageModel} from './page.model';
import {draftModel} from './draft.model';
let pageEditModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            status: obj['@status']
        };
        if('page' in obj) {
            parsed.page = pageModel.parse(obj.page);
        }
        if('draft' in obj) {
            parsed.draft = draftModel.parse(obj.draft);
        }
        if('page.base' in obj) {
            parsed.pageBase = pageModel.parse(obj['page.base']);
        }
        if('page.overwritten' in obj) {
            parsed.pageOverwritten = pageModel.parse(obj['page.overwritten']);
        }
        return parsed;
    }
};
export {pageEditModel};
