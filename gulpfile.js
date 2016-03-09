/**
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
'use strict';

var fs = require('fs');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var wiredep = require('wiredep').stream;

var plugins = gulpLoadPlugins();

var LOCAL_OWA_FOLDER = '/Users/djazayer/openmrs/oneeleven/owa';
var THIS_APP_ID = 'uicommons';

var htmlGlob = ['app/**/*.html'];
var resourcesGlob = ['app/**/*.{png,svg,jpg,gif,eot,ttf,woff}', 'app/**/*.{css,less}',
  'app/**/*.js', 'app/manifest.webapp', /* list extra resources here */ ];

gulp.task('copy-bower-packages', function() {
  try {
    fs.statSync('bower_components');

    return gulp.src(mainBowerFiles(), {
      base: 'bower_components'
    }).pipe(gulp.dest('dist/lib'));
  } catch (err) {
    // Don't panic
  }
});

gulp.task('html', ['copy-bower-packages'], function() {
  try {
    fs.statSync('bower_components');

    // User wiredep to automagically link bower packages
    return gulp.src(htmlGlob).pipe(wiredep({
      ignorePath: '../bower_components/',
      fileTypes: {
        html: {
          replace: {
            js: '<script src="lib/{{filePath}}"></script>',
            css: '<link rel="stylesheet" href="lib/{{filePath}}" />'
          }
        }
      }
    })).pipe(gulp.dest('dist'));
  } catch (err) {
    return gulp.src(htmlGlob)
      .pipe(gulp.dest('dist'));
  }
});

gulp.task('compass', function() {
  gulp.src('/src/scss/sass/**/*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: 'src/scss/config.rb',
      css: 'dist/css',
      sass: 'src/scss/sass'
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('resources', ['compass'], function() {
  return gulp.src(resourcesGlob)
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy-local', ['build'], function() {
  return gulp.src(['dist/**/*', '!*.zip'])
    .pipe(gulp.dest(LOCAL_OWA_FOLDER + '/' + THIS_APP_ID));
});

gulp.task('build', ['resources', 'html'], function() {
  return gulp.src('dist/**/*')
    .pipe(plugins.zip(THIS_APP_ID + '.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
