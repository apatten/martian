/* eslint-disable no-undef */
const _platformId = typeof window === 'undefined' ? 'node' : 'browser';
export const platform = {
    base64: {
        encode(rawString) {
            if(_platformId === 'node') {

                // In node, use `Buffer` to encode.
                return (new Buffer(rawString)).toString('base64');
            }

            // In the browser, use btoa() to encode.
            return window.btoa(rawString);
        },
        decode(b64String) {
            if(_platformId === 'node') {

                // In node, use `Buffer` to decode.
                return (new Buffer(b64String, 'base64')).toString('utf8');
            }

            // In the browser, use atob() to decode.
            return window.atob(b64String);
        }
    },
    fileReader: {
        toBuffer(fileObj) {
            if(_platformId === 'browser') {
                const fileReader = new FileReader();
                return fileReader.readAsArrayBuffer(fileObj);
            }
        },
        getContentType(fileObj) {
            if(_platformId === 'browser') {
                return fileObj.type;
            }
        }
    }
};

/* eslint-enable no-undef */
