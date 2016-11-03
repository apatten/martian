/* eslint-env node */
const Plug = require.requireActual('./plug.js').Plug;
class ProgressPlug extends Plug {
    put() {
        return Promise.resolve({ responseText: '{ "response":"text" }' });
    }
}
module.exports = { ProgressPlug };
