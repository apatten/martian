'use strict';

var jspm = require('jspm');
var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var cached = require('gulp-cached');
var karma = require('karma').server;
var bundleOptions = {
        minify: false,
        sourceMaps: false
    };
var inspectSrc = [
    'lib/*',
    'model/*',
    'draft.js',
    'feedback.js',
    'file.js',
    'page.js',
    'page.pro.js',
    'pageHierarchy.js',
    'pageProperty.js',
    'site.js',
    'user.js',
    'error/*'
];
var babelSrc = [
    'draft.js',
    'feedback.js',
    'file.js',
    'page.js',
    'page.pro.js',
    'pageHierarchy.js',
    'pageProperty.js',
    'site.js',
    'user.js',
];

/*** js tests ***/
gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

/*** sub tasks ***/
gulp.task('inspect:lint', function() {
    var jshint = require('gulp-jshint');
    var stylish = require('jshint-stylish');
    return gulp.src(inspectSrc)
        .pipe(cached('inspect:lint'))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('inspect:jscs', function() {
    var codeStyle = require('gulp-jscs');
    return gulp.src(inspectSrc)
        .pipe(cached('inspect:jscs'))
        .pipe(codeStyle());
});

/*** main tasks ***/
gulp.task('inspect', [ 'inspect:lint', 'inspect:jscs' ]);
gulp.task('default', [ 'inspect', 'test' ]);