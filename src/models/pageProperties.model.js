import modelHelper from './modelHelper';
import pagePropertyModel from './pageProperty.model';
let pagePropertiesModel = {
    parse(data) {
        let obj = modelHelper.fromJson(data);
        let parsed = {
            count: parseInt(obj['@count']),
            href: obj['@href'],
            property: []
        };
        if('property' in obj) {
            if(!Array.isArray(obj.property)) {
                obj.property = [ obj.property ];
            }
            obj.property.forEach((prop) => {
                parsed.property.push(pagePropertyModel.parse(prop));
            });
        }
        return parsed;
    }
};
export default pagePropertiesModel;
