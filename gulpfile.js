// JavaScript Document

// include gulp
var gulp = require('gulp'); 

// include plug-ins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

var config = {
    bootstrapDir: './bower_components/bootstrap',
    devDir: './pre',
    publicDir: './build',
};

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./pre/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    return gulp.src(config.devDir + '/styles/**/*.scss')
		.pipe(sass())
    .pipe(gulp.dest(config.publicDir + '/styles'));
});



// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./pre/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

// default gulp task
gulp.task('default', ['styles', 'sass'], function() {
  // watch for HTML changes
 

  // watch for JS changes
  gulp.watch('./pre/scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./pre/styles/*.css', function() {
    gulp.run('styles');
  });
});