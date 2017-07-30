const _htmlEscapeChars = {

    // '¢': 'cent',
    // '£': 'pound',
    // '¥': 'yen',
    // '€': 'euro',
    // '©': 'copy',
    // '®': 'reg', Removed due to Dream unable to encode properly
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '&': 'amp',
    '\'': '#39'
};
const _regexString = new RegExp(`${Object.keys(_htmlEscapeChars).reduce((prev, key) => `${prev}${key}`, '[')}]`, 'g');

export const utility = {
    xmlRequestType: 'application/xml; charset=utf-8',
    textRequestType: 'text/plain; charset=utf-8',
    jsonRequestType: 'application/json; charset=utf-8',
    escapeHTML(unescaped = '') {
        return unescaped.replace(_regexString, (m) => '&' + _htmlEscapeChars[m] + ';');
    },
    searchEscape(query) {
        let result = query.toString();
        let charArr = [ '\\', '+', '-', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':' ];
        charArr.forEach((c) => {
            let regex = new RegExp('\\' + c, 'g');
            result = result.replace(regex, '\\' + c);
        });
        return result;
    },
    getResourceId(id, defaultId) {
        if(!id && !defaultId) {
            throw new Error('Unable to resolve the input ID to an API resource ID');
        }
        let resourceId = defaultId;
        if(typeof id === 'string' && id !== defaultId) {
            resourceId = `=${encodeURIComponent(encodeURIComponent(id))}`;
        } else if(id) {
            resourceId = id;
        }
        return resourceId;
    },
    getNormalizedUserActivityToken(token) {
        let resourceId = null;
        if(typeof token === 'string') {
            if(token.includes(':')) {
                resourceId = token;
            } else {
                resourceId = `=${encodeURIComponent(encodeURIComponent(token))}`;
            }
        } else if(typeof token === 'number') {
            resourceId = token;
        } else {
            throw new Error('The user activity token must be a string or number');
        }
        return resourceId;
    },
    getFilenameId(filename) {
        if(typeof filename !== 'string') {
            throw new Error('The filename must be a string');
        }
        let encodedName = encodeURIComponent(encodeURIComponent(filename));
        if(!filename.includes('.')) {

            // File name has no dot (or the dot is at the first position).
            // Assume that means it doesn't have an extension.
            encodedName = `=${encodedName}`;
        }
        return encodedName;
    },
    getApiDateString(date) {
        const dateParts = {
            year: date.getFullYear(),
            month: `0${date.getMonth() + 1}`.slice(-2),
            day: `0${date.getDate()}`.slice(-2),
            hours: `0${date.getHours()}`.slice(-2),
            minutes: `0${date.getMinutes()}`.slice(-2),
            seconds: `0${date.getSeconds()}`.slice(-2)
        };
        return `${dateParts.year}${dateParts.month}${dateParts.day}${dateParts.hours}${dateParts.minutes}${dateParts.seconds}`;
    }
};
