import Time from 'lib/time';
let modelHelper = {
    fromJson(data) {
        if(typeof data === 'string') {
            data = JSON.parse(data);
        }
        return data;
    },
    getString(field) {
        return (typeof field === 'string') ? field : field['#text'];
    },
    getBool(field) {
        return field === 'true';
    },
    getDate(field) {
        return new Time(new Date(field));
    },
    addIfDefined(field, name, obj, parser = null) {
        if(typeof field !== 'undefined') {
            if(parser !== null) {
                field = parser.parse.call(parser, field);
            }
            obj[name] = field;
        }
    }
};
export default modelHelper;
