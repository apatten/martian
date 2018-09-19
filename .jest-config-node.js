/* eslint-env node */
const commonConfig = require('./.jest-config-common');
module.exports = Object.assign({}, commonConfig, {
    testEnvironment: 'jest-environment-node',
    globals: { __DefaultMindTouchHost: 'https://example.com' }
});
