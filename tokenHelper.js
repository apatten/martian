/* eslint-env node */
const crypto = require('crypto');

exports.createHelper = function(key, secret) {
    return () => {
        let hmac = crypto.createHmac('sha256', secret);
        let epoch = Math.floor(Date.now() / 1000);
        hmac.update(`${key}${epoch}`);
        let hash = hmac.digest('hex');
        return `${key}_${epoch}_${hash}`;
    };
};
