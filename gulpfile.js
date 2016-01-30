'use strict';

var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');
var concat 			= require('gulp-concat');
var sourcemaps 		= require('gulp-sourcemaps');
var minifyjs 		= require('gulp-uglify');
var minifycss 		= require('gulp-uglifycss');
var notify 			= require('gulp-notify');
var rename 			= require('gulp-rename');
var plumber			= require('gulp-plumber');
var jshint			= require('gulp-jshint');
var browserSync 	= require('browser-sync');
var reload 			= browserSync.reload;