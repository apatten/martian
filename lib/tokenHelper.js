import crypto from 'crypto';
export let tokenHelper = {
    createHelper(key, secret) {
        return () => {
            const hmac = crypto.createHmac('sha256', secret);
            hmac.update(`${key}${Date.now()}`);
            return hmac.digest('hex');
        };
    }
};
