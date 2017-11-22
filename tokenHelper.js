/* eslint-env node */
const crypto = require('crypto');

function getToken(key, secret, user) {
    const hmac = crypto.createHmac('sha256', secret);
    const epoch = Math.floor(Date.now() / 1000);
    hmac.update(`${key}${epoch}${user}`);
    const hash = hmac.digest('hex');
    return `int_${key}_${epoch}_${hash}`;
}

exports.nameTokenGenerator = (key, secret) => {
    return (username) => getToken(key, secret, `=${username}`);
};
exports.idTokenGenerator = (key, secret) => {
    return (userId) => getToken(key, secret, userId);
};
