'use strict';

/*****************
 * Project Setup
/****************/

/* Dependencies */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minifyjs = require('gulp-uglify');
var minifycss = require('gulp-uglifycss');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var filter = require('gulp-filter');
var runSequence = require('gulp-run-sequence');
var del = require('del');
var zip = require('gulp-zip');
var browserSync = require('browser-sync');

/* Variables */
var reload = browserSync.reload;
var url = 'localhost:8888/sip'; // Change to fit your dev environment
var source = './assets/';
var build = './build/';
var project = 'sip'; // Names the .zip file on build task

/* Asynchronous browser syncing of assets across multiple devices */
gulp.task('browser-sync', function() {
  browserSync.init('**/*.php', {
    proxy: url
  });
});

/***********
 * CSS Task
/**********/

/* Compile Sass */
gulp.task('styles', function() {
  return gulp.src([source + 'sass/app.scss'])
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      },
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(
      'last 2 version',
      'safari 5', 'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ))
    .pipe(sourcemaps.write('../maps'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(source + 'css'))
    .pipe(filter('**/*.css')) // Filtering stream to only css files
    .pipe(reload({stream:true})) // Inject Styles when style file is created
    .pipe(rename({ suffix: '-min' }))
    .pipe(minifycss({
      maxLineLen: 80,
    }))
    .pipe(gulp.dest(source + 'css'))
    .pipe(reload({stream:true})) // Inject Styles when min style file is created
    .pipe(notify({ message: 'Styles task complete', onLast: true }));
});

/***********
 * JS Tasks
/**********/

/* Concat and uglify JS */
gulp.task('js', function() {
  return gulp.src([
      source + 'js/components/*.js',
      source + 'js/app/**/*.js'
    ])
    .pipe(concat('development.js'))
    .pipe(gulp.dest(source + 'js'))
    .pipe(rename({
      basename: 'production',
      suffix: '-min',
    }))
    .pipe(minifyjs())
    .pipe(gulp.dest(source + 'js/'))
    .pipe(notify({ message: 'JS task complete', onLast: true }));
});

/* jsHint */
gulp.task('jsHint', function() {
  return gulp.src([source + 'js/app/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'jsHint task complete', onLast: true }));
});

/*****************
 * Other Tasks
/*****************/

/* Optimize Images */
gulp.task('images', function() {
  return gulp.src([source + 'img/raw/**/*.+(png|jpg|jpeg|gif|svg)'])
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest(source + 'img/'))
    .pipe(notify({ message: 'Images task complete', onLast: true }));
});

/* Build PHP */
gulp.task('buildPhp', function() {
  return gulp.src(['**/*.php', './style.css', './screenshot.png'])
    .pipe(gulp.dest(build))
    .pipe(notify({ message: 'BuildPhp task complete', onLast: true }));
});

/* Build JS Production */
gulp.task('buildJsProd', function() {
  return gulp.src([source + 'js/production-min.js'])
    .pipe(gulp.dest(build + '/assets/js'))
    .pipe(notify({ message: 'Copy of Assets/js directory complete', onLast: true }));
});

/* Build JS Vendor */
gulp.task('buildJsVend', function() {
  return gulp.src([source + 'js/vendor/*.js'])
    .pipe(gulp.dest(build + '/assets/js/vendor'))
    .pipe(notify({ message: 'Copy of js/vendor directory complete', onLast: true }));
});

/* Build CSS */
gulp.task('buildCss', function() {
  return gulp.src([source + 'css/app-min.css'])
    .pipe(gulp.dest(build + '/assets/css'))
    .pipe(notify({ message: 'Copy of Assets directory complete', onLast: true }));
});

/* Build Images */
gulp.task('buildImg', function() {
  return gulp.src([source + 'img/*.+(png|jpg|jpeg|gif|svg)'])
    .pipe(gulp.dest(build + 'assets/img/'))
    .pipe(notify({ message: 'BuildImg task complete', onLast: true }));
});

/* Build Library */
gulp.task('buildLib', function() {
  return gulp.src(['./lib/languages/*'])
    .pipe(gulp.dest(build + 'lib/languages'))
    .pipe(notify({ message: 'Copy of lib/languages directory complete', onLast: true }));
});

/* Clean Task */
gulp.task('clean', function(cb) {
  return del(['**/build', '**/.DS_Store'], cb);
});

/* Zip up */
gulp.task('buildZip', function() {
  return gulp.src([build + '/**/'])
    .pipe(zip(project + '.zip'))
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: 'Zip task complete', onLast: true }));
});

/**************
 * Main Tasks
/*************/

/* Build */
gulp.task('build', function(cb) {
  runSequence('clean', 'styles', 'js', 'buildPhp', 'buildCss', 'buildJsProd', 'buildJsVend', 'buildLib', 'buildImg', 'buildZip', 'clean', cb);
});

/* Default */
gulp.task('default', ['styles', 'js', 'jsHint', 'images', 'browser-sync'], function() {
  gulp.watch(source + 'sass/**/*.scss', ['styles']);
  gulp.watch(source + 'js/app/**/*.js', ['js', browserSync.reload]);
  gulp.watch(source + 'js/app/**/*.js', ['jsHint']);
  gulp.watch(source + 'img/**/*.{png,jpg,gif}', ['images']);
});
