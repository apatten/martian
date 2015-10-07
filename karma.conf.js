module.exports = function(config) {
    'use strict';
    config.set({
        basePath: 'src',
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
            'test/mock-ajax.js'
        ],
        jspm: {
            loadFiles: [
                'test/plug.test.js',
                'test/mock/*.js',
                'test/api/*.test.js'
            ],
            serveFiles: [
                'lib/*.js',
                'models/*.js',
                'api/*.js',
                'errors/*.js'
            ]
        },
        preprocessors: {
            'lib/*.js': [ 'babel', 'sourcemap', 'coverage' ],
            'models/*.js': [ 'babel', 'sourcemap', 'coverage' ],
            'api/*.js': [ 'babel', 'sourcemap', 'coverage' ],
            'errors/*.js': [ 'babel', 'sourcemap', 'coverage' ],
            'test/mock/*.mock.js': [ 'babel' ],
            'test/**/*.test.js': [ 'babel' ]
        }, 
        babelPreprocessor: {
            options: {
                modules: 'system',
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
                'api/*.js': 'isparta'
            },
            reporters: [
                // For now, just enable the console-based text reporter.
                // In the future, we can turn on the HTML reports once we have a way to consume them.
                //{ type: 'html', dir: 'coverage/' },
                { type: 'text' }
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
