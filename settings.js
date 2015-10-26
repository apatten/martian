let properties = { 
    host: '' 
};
let settings = {
    get(propertyName) {
        return properties[propertyName];
    },
    set(propertyName, value) {
        properties[propertyName] = value;
    },
    getSettings() {
        return properties;
    }
};
export default settings;
