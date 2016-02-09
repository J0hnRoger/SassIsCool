'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var browserSync = require('browser-sync').create();

var input = './sass/**/*.scss';
var output = './dist/';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var sassdocOptions = {
  dest: './dist/sassdoc'
};

gulp.task('generate-sass-doc', ['sass'], function (){
  return gulp.src(input)
    .pipe(sassdoc())
    .resume();
});

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
