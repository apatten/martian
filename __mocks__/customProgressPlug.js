/* eslint-env node */
const ProgressPlug = require.requireActual('./progressPlug.js').ProgressPlug;
module.exports = customFields => {
    Object.keys(customFields).forEach(field => {
        ProgressPlug.prototype[field] = customFields[field];
    });
    return { ProgressPlug };
};
