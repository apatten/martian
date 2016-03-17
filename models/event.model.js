import {modelHelper} from './modelHelper';
export let eventModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            id: obj['@id'],
            datetime: modelHelper.getDate(obj['@datetime']),
            type: obj['@type'],
            journaled: modelHelper.getBool(obj['@journaled']),
            version: modelHelper.getInt(obj['@version']),
            requestId: obj.request['@id']
        };
        if('@language' in obj) {
            parsed.language = obj['@language'];
        }
        if('page' in obj) {
            parsed.page = {
                id: obj.page['@id'],
                path: obj.page.path
            };
            if('@revision' in obj.page) {
                parsed.page.revision = modelHelper.getInt(obj.page['@revision']);
            }
        }
        if('user' in obj) {
            parsed.user = { id: obj.user['@id'] };
            if('name' in obj.user) {
                parsed.user.name = obj.user.name;
            }
        }
        if('data' in obj) {
            if(parsed.type === 'user:search') {
                parsed.data = {
                    constraint: obj.data.constraint,
                    path: obj.data.path,
                    query: obj.data.query,
                    limit: modelHelper.getInt(obj.data.limit),
                    qid: modelHelper.getInt(obj.data.qid),
                    totalrecommended: modelHelper.getInt(obj.data.totalrecommended),
                    totalresults: modelHelper.getInt(obj.data.totalresults)
                };
            } else {

                // The only other type possible here is 'page:view'
                parsed.data = {
                    host: obj.data['_uri.host'],
                    query: obj.data['_uri.query'],
                    scheme: obj.data['_uri.scheme']
                };
            }
        }
        return parsed;
    }
};
