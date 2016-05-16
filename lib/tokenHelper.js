import crypto from 'crypto';
export let tokenHelper = {
    createHelper(key, secret) {
        let hmac = crypto.createHmac('sha256', secret);
        return () => {
            hmac.update(`${key}${Date.now()}`);
            return hmac.digest('hex');
        };
    }
};
