let parsedCache = {};
let properties = {};
let settings = {
    read(key = 'global-settings') {
        if(!(key in parsedCache) || parsedCache[key] !== true) {
            let tagId = `#mt-${key}`;
            let elem = document.querySelector(tagId);
            if(elem) {
                let jsonString = elem.textContent;

                // IE8 doesn't like innerText from script tags.
                // Use text here.
                if(!jsonString || jsonString === '') {
                    jsonString = elem.text;
                }
                let settings = JSON.parse(jsonString);
                Object.keys(settings).forEach((propKey) => {
                    properties[propKey] = settings[propKey];
                });
                parsedCache[key] = true;
            }
        }
    },
    get(propertyName) {
        return properties[propertyName];
    },
    set(propertyName, value) {
        properties[propertyName] = value;
    }
};
settings.read();
export default settings;
