'use strict';

var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');
var concat 		   	= require('gulp-concat');
var sourcemaps 	 	= require('gulp-sourcemaps');
var minifyjs 		= require('gulp-uglify');
var minifycss 		= require('gulp-uglifycss');
var notify 			= require('gulp-notify');
var rename 			= require('gulp-rename');
var plumber			= require('gulp-plumber');
var jshint		  	= require('gulp-jshint');
var filter          = require('gulp-filter');
var browserSync 	= require('browser-sync');

var reload 		   	= browserSync.reload;
var url 			= 'localhost:8888/sandbox';
var source     		= './assets/';

/* Asynchronous browser syncing of assets across multiple devices */
gulp.task('browser-sync', function() {
  browserSync.init('**/*.php', {
    proxy: url
  });
});

/* Compiles Sass */
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

/* Default task */
gulp.task('default', ['styles', 'browser-sync'], function() {
  gulp.watch(source + 'sass/**/*.scss', ['styles']);
});
