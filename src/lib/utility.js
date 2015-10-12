import stringUtility from './stringUtility';
let utility = {
    getStringParams: function(queryString) {
        let retVal = {};
        let params = stringUtility.words(stringUtility.stringRight(queryString, '?'), '&');
        params.forEach(function(pair) {
            let myPair = pair.split('=');
            if(myPair[0]) {
                retVal[decodeURIComponent(myPair[0])] = decodeURIComponent(myPair[1]);
            }
        });
        return retVal;
    },
    buildQueryString: function(paramObject) {
        let queryString = '';
        Object.keys(paramObject).forEach(function(key, index, arr) {
            queryString += encodeURIComponent(key) + '=' + encodeURIComponent(paramObject[key]);
            if(index < arr.length - 1) {
                queryString += '&';
            }
        });
        return queryString;
    }
};
export default utility;
