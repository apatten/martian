import modelHelper from './modelHelper';
let pageContentsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            type: obj['@type'],
            title: obj['@title']
        };
        if(Array.isArray(obj.body)) {
            parsed.body = obj.body[0];
            parsed.targets = pageContentsModel._getTargets(obj.body);
        } else {
            parsed.body = obj.body;
        }
        modelHelper.addIfDefined(obj.tail, 'tail', parsed);
        return parsed;
    },
    _getTargets(body) {
        let targets = [];
        if(body.length > 1) {
            for(let i = 1; i < body.length; i++) {
                targets.push({
                    [ body[i]['@target'] ]: body[i]['#text']
                });
            }
        }
        return targets;
    }
};
export default pageContentsModel;
