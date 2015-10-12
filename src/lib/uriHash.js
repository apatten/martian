import utility from './utility';
import stringUtility from './stringUtility';
export default class UriHash {
    constructor(hashStr) {
        if(stringUtility.startsWith(hashStr, '#')) {
            hashStr = hashStr.substr(1);
        }
        this._hashStr = hashStr || '';
        this._params = utility.getStringParams(hashStr);
    }
    getQueryParams() {
        return this._params;
    }
    replaceParams(paramObject) {
        return new UriHash(utility.buildQueryString(paramObject));
    }
    withParam(key, val) {
        var newParams = this._params;
        newParams[key] = val;
        return this.replaceParams(newParams);
    }
    withoutParam(key) {
        var newParams = this._params;
        delete newParams[key];
        return this.replaceParams(newParams);
    }
    getParam(key) {
        return this._params[key];
    }
    toHashString() {
        return '#' + this._hashStr;
    }
}
