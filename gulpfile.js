'use strict';

var jspm = require('jspm');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('karma').server;
var bundleOptions = {
        minify: false,
        sourceMaps: false
    };

/*** js sub tasks ***/
gulp.task('default', function(cb) {
    var outFile = 'martian.js';
    jspm.bundleSFX('martian', outFile, bundleOptions).then(function() {
        var stream = gulp.src(outFile)
            .pipe(plumber())
            .pipe(gulp.dest('out'));
        cb();
    }).catch(function(err) {
        cb(err);
    });
});

/*** js tests ***/
gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});
