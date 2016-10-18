/* eslint-disable no-undef */
export const platform = {
    platformId: typeof window === 'undefined' ? 'node' : 'browser',
    base64: {
        encode(rawString) {
            if(this.platformId === 'node') {

                // In node, use `Buffer` to encode.
                return (new Buffer(rawString)).toString('base64');
            }

            // In the browser, use btoa() to encode.
            return window.btoa(rawString);
        },
        decode(b64String) {
            if(this.platformId === 'node') {

                // In node, use `Buffer` to decode.
                return (new Buffer(b64String, 'base64')).toString('utf8');
            }

            // In the browser, use atob() to decode.
            return window.atob(b64String);
        }
    },
    fileReader: {
        toBuffer(fileObj) {
            if(this.platformId === 'browser') {
                const fileReader = new FileReader();
                return fileReader.readAsArrayBuffer(fileObj);
            }
        },
        getContentType(fileObj) {
            if(this.platformId === 'browser') {
                return fileObj.type;
            }
        }
    }
};

/* eslint-enable no-undef */
