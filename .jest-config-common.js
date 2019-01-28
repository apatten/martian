/* eslint-env node */
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/*.js', '<rootDir>/lib/*.js'],
    coverageDirectory: '__coverage-node__',
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/lib/platform.js',
        '<rootDir>/lib/globalFetch.js',
        '<rootDir>/jest-config-common.js',
        '<rootDir>/jest-config-jsdom.js',
        '<rootDir>/jest-config-node.js'
    ],
    testMatch: ['**/__tests__/**/*.js'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
