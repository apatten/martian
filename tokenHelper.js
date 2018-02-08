/* eslint-env node */
const crypto = require('crypto');

exports.tokenGenerator = (key, secret) => {
    return user => {
        user = typeof user === 'number' ? user : `=${user}`;
        const hmac = crypto.createHmac('sha256', secret);
        const epoch = Math.floor(Date.now() / 1000);
        hmac.update(`${key}${epoch}${user}`);
        const hash = hmac.digest('hex');
        return `int_${key}_${epoch}_${user}_${hash}`;
    };
};
