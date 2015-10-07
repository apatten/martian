import modelHelper from './modelHelper';
import Time from 'lib/time';
let subpagesModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            totalcount: parseInt(obj['@totalcount']),
            count: parseInt(obj['@count']),
            href: obj['@href']
        };
        if(parsed.count > 0) {
            let objSubpages = obj['page.subpage'];
            if(objSubpages) {
                let subpages = Array.isArray(objSubpages) ? objSubpages : [ objSubpages ];
                parsed.pageSubpage = [];
                subpages.forEach(sp => {
                    parsed.pageSubpage.push({
                        id: parseInt(sp['@id']),
                        href: sp['@href'],
                        deleted: modelHelper.getBool(sp['@deleted']),
                        subpages: modelHelper.getBool(sp['@subpages']),
                        dateCreated: new Time(sp['date.created']),
                        language: sp.language,
                        namespace: sp.namespace,
                        path: modelHelper.getString(sp.path),
                        title: sp.title,
                        uriUi: sp['uri.ui']
                    });
                });
            }
        }
        return parsed;
    }
};
export default subpagesModel;
