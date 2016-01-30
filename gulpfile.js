'use strict';

/*****************
 * ! Project Setup
/*****************/

/* Dependencies */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minifyjs = require('gulp-uglify');
var minifycss	= require('gulp-uglifycss');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var plumber	= require('gulp-plumber');
var jshint = require('gulp-jshint');
var filter = require('gulp-filter');
var browserSync	= require('browser-sync');

/* Variables */
var reload = browserSync.reload;
var url = 'localhost:8888/sandbox';
var source = './assets/';
var build = './build/';
var project = 'sip';

/*************************************************************************
 * ! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css
/*************************************************************************/

/* Asynchronous browser syncing of assets across multiple devices */
gulp.task('browser-sync', function() {
  browserSync.init('**/*.php', {
    proxy: url
  });
});

/*************************************************************************
 * ! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css
/*************************************************************************/

/* Compile Sass Task */
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

/*************************************************************************
 * ! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css
/*************************************************************************/

/* Concat and uglify JS Task */
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
    .pipe(notify({ message: 'Scripts task complete', onLast: true }));
});

/* jsHint Task */
gulp.task('jsHint', function() {
  return gulp.src([source + 'js/app/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'jsHint task complete', onLast: true }));
});

/*************************************************************************
 * ! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css
/*************************************************************************/

/* Optimize Images */
gulp.task('images', function() {
  return gulp.src([source + 'img/raw/**/*.{png,jpg,gif}'])
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest(source + 'img/'))
    .pipe(notify({ message: 'images task complete', onLast: true }));
});

/*************************************************************************
 * ! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css
/*************************************************************************/

/* Development Task */
gulp.task('default', ['styles', 'js', 'jsHint', 'browser-sync'], function() {
  gulp.watch(source + 'sass/**/*.scss', ['styles']);
  gulp.watch(source + 'js/app/**/*.js', ['js', browserSync.reload]);
  gulp.watch(source + 'js/app/**/*.js', ['jsHint']);
});
