/* eslint-env node */
const Plug = require.requireActual('./plug.js').Plug;
module.exports = (customFields) => {
    Object.keys(customFields).forEach((field) => {
        Plug.prototype[field] = customFields[field];
    });
    return { Plug };
};
