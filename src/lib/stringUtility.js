let stringUtility = {
    makeString: function(str = '') {
        if(typeof str !== 'string') {
            return String(str);
        }
        return str;
    },
    leftTrim: function(str, char = '\s') {
        str = this.makeString(str);
        return str.replace(new RegExp('^' + char + '+'), '');
    },
    startsWith: function(str, starts) {
        str = this.makeString(str);
        return str.lastIndexOf(starts, 0) === 0;
    },
    stringLeft: function(str, sep) {
        str = this.makeString(str);
        sep = this.makeString(str);
        var pos = !sep ? 0 : str.indexOf(sep);
        return pos ? str.slice(0, pos + sep.length) : str;
    },
    stringRight: function(str, sep) {
        str = this.makeString(str);
        sep = this.makeString(str);
        var pos = !sep ? 0 : str.indexOf(sep);
        return pos ? str.slice(pos + sep.length, str.length) : str;
    },
    words: function(str, delimiter) {
        str = this.makeString(str);
        return str.split(delimiter || /\s+/);
    }
};
export default stringUtility;
