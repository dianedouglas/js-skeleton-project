var gulp = require('gulp');

//css stuff
var path = require('path');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

//used by several tasks for renaming.
var rename = require("gulp-rename");

//used to package up JS
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//CSS
//preprocessing
gulp.task('css', function() {
  gulp.src('./less/styles.less')
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(gulp.dest('./static/css'))
  .pipe(minifyCSS({keepBreaks:true}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./static/css'));
});

//run the 'css' task whenever any of the 'less' files change
gulp.task('watchCSS', function() {
  gulp.watch('less/**/*.less', ['css']);
});

////////////////////////////////////////////////////////////////////
//JS: merge all server side js into a single file and compress it
gulp.task('jsServer', function() {
 gulp.src('./src/**/*.js')
 .pipe(concat('scripts.js'))
 .pipe(gulp.dest('./build/'))
 .pipe(rename({suffix: '.min'}))
 .pipe(uglify())
 .pipe(gulp.dest('./build/'))
});

gulp.task('watchJSServer', function() {
 gulp.watch('src/**/*.js', ['jsServer']);
});
////////////////////////////////////////////////////////////////////
//JS: packing client side JS into one file, browserifying and minifying.

// old way.
// var browserify = require('gulp-browserify');
//
// gulp.task('jsClient', function() {
//   gulp.src('./js/*.js')
//   .pipe(browserify())
//   .pipe(concat('scripts.js'))
//   .pipe(gulp.dest('./static/js'))
//   .pipe(uglify())
//   .pipe(rename({suffix: '.min'}))
//   .pipe(gulp.dest('./static/js'))
// });

// new way
// good ref: http://fettblog.eu/gulp-browserify-multiple-bundles/
var browserify = require('browserify');
var source     = require('vinyl-source-stream');

gulp.task('jsClient', function() {
    return browserify({ entries: ['./js/clientside.js'] })
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(gulp.dest('./static/js'));
});

gulp.task('watchJSClient', function() {
 gulp.watch('js/**/*.js', ['jsClient']);
});

////////////////////////////////////////////////////////////////////
// Testing
var mocha = require('gulp-mocha');

gulp.task('runTests', function(){
	return gulp.src('src/**/*.spec.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watchJsModulesAndSpecs', function(){
  gulp.watch(['src/**/*.js', 'src/**/*.spec.js'], ['runTests']);
});


////////////////////////////////////////////////////////////////////
//assign css, js and watchers task to default to be triggered with 'gulp.'
gulp.task('default', ['css', 'watchCSS', 'jsServer', 'jsClient', 'watchJSServer', 'watchJSClient', 'runTests', 'watchJsModulesAndSpecs']);
