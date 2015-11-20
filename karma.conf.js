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
            'test/mock-ajax.js'
        ],
        exclude: [
            'karama.conf.js',
            'martian.js',
            'index.js'
        ],
        jspm: {
            config: 'config.js',
            packages: 'jspm_packages/',
            loadFiles: [
                'test/plug.test.js',
                'test/mock/*.js',
                'test/*.test.js'
            ],
            serveFiles: [
                'lib/*.js',
                'models/*.js',
                '*.js',
                'errors/*.js'
            ]
        },
        preprocessors: {
            'lib/*.js': [ 'babel', 'sourcemap', 'coverage' ],
            'models/*.js': [ 'babel', 'sourcemap', 'coverage' ],
            'errors/*.js': [ 'babel', 'sourcemap', 'coverage' ],
            'draft.js': [ 'babel', 'sourcemap', 'coverage' ],
            'file.js': [ 'babel', 'sourcemap', 'coverage' ],
            'group.js': [ 'babel', 'sourcemap', 'coverage' ],
            'feedback.js': [ 'babel', 'sourcemap', 'coverage' ],
            'page.js': [ 'babel', 'sourcemap', 'coverage' ],
            'page.pro.js': [ 'babel', 'sourcemap', 'coverage' ],
            'pageHierarchy.js': [ 'babel', 'sourcemap', 'coverage' ],
            'pageProperty.js': [ 'babel', 'sourcemap', 'coverage' ],
            'site.js': [ 'babel', 'sourcemap', 'coverage' ],
            'user.js': [ 'babel', 'sourcemap', 'coverage' ],
            'plug.js': [ 'babel', 'sourcemap', 'coverage' ],
            'uri.js': [ 'babel', 'sourcemap', 'coverage' ],
            'uriHash.js': [ 'babel', 'sourcemap', 'coverage' ],
            'settings.js': [ 'babel', 'sourcemap', 'coverage' ],
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
                '*.js': 'isparta'
            },
            reporters: [
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
