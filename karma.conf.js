/* eslint-env node */
module.exports = function(config) {
    'use strict';
    config.set({
        basePath: './',
        frameworks: [ 'jspm', 'jasmine' ],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-babel-preprocessor',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-jspm'
        ],
        files: [
            'node_modules/jasmine-ajax/lib/mock-ajax.js'
        ],
        exclude: [
            'karama.conf.js',
            'gulpfile.js'
        ],
        jspm: {
            config: 'config.js',
            packages: 'jspm_packages/',
            loadFiles: [
                'test/mock/*.js',
                'test/*.test.js'
            ],
            serveFiles: [
                '*.js',
                'lib/*.js',
                'models/*.js',
                'errors/*.js'
            ]
        },
        preprocessors: {
            '*.js': [ 'babel', 'sourcemap', 'coverage' ],
            '*(errors|lib|models)/*.js': [ 'babel', 'sourcemap', 'coverage' ],
            'test/**/*.js': [ 'babel' ]
        },
        babelPreprocessor: {
            options: {
                presets: [ 'es2015' ],
                sourceMap: 'inline'
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },
        reporters: [ 'progress', 'coverage' ],
        coverageReporter: {
            instrumenters: { isparta: require('isparta') },
            instrumenter: {
                '*.js': 'isparta'
            },
            reporters: [
                {
                    type: 'html',
                    dir: 'coverage/'
                },
                { type: 'text' },
                { type: 'lcov' }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ 'PhantomJS' ],
        singleRun: true
    });
};
