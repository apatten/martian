/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var jspm = require('jspm');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var cached = require('gulp-cached');
var karma = require('karma').server;
var inspectSources = [
    'lib/*',
    'model/*',
    'draft.js',
    'feedback.js',
    'file.js',
    'group.js',
    'page.js',
    'page.pro.js',
    'pageHierarchy.js',
    'pageProperty.js',
    'site.js',
    'time.js',
    'user.js',
    'error/*'
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
    return gulp.src(inspectSources)
        .pipe(cached('inspect:lint'))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('inspect:jscs', function() {
    var codeStyle = require('gulp-jscs');
    return gulp.src(inspectSources)
        .pipe(cached('inspect:jscs'))
        .pipe(codeStyle());
});

/*** main tasks ***/
gulp.task('inspect', [ 'inspect:lint', 'inspect:jscs' ]);
gulp.task('default', [ 'inspect', 'test' ]);