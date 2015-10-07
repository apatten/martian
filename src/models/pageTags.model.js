import modelHelper from './modelHelper';
let pageTagsModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: parseInt(obj['@count']),
            href: obj['@href']
        };
        if('tag' in obj) {
            parsed.tags = [];
            let tags = Array.isArray(obj.tag) ? obj.tag : [ obj.tag ];
            tags.forEach((tag) => {
                parsed.tags.push({
                    value: tag['@value'],
                    id: parseInt(tag['@id']),
                    href: tag['@href'],
                    title: tag.title,
                    type: tag.type,
                    uri: tag.uri
                });
            });
        }
        return parsed;
    }
};
export default pageTagsModel;
