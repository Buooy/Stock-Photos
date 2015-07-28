/*
* Run This Script beforehand
* npm install --save-dev gulp gulp-clean gulp-ruby-sass gulp-concat gulp-minify-css gulp-uglify gulp-babel run-sequence
*/


var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");

//	===================================================
// 	Style specific Actions
//	===================================================
// Builds the style
gulp.task('buildStyles', function (callback) {
	
	runSequence(
    	'sassStyles',
    callback);
	
});
//	Runs the SASS
gulp.task('sassStyles', function () {
	
	return sass('css/style.scss') 
		.on('error', function (err) {
			
			console.error('Error!', err.message);
			
		})
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe( gulp.dest('./css') );	// Outputs to the root theme directory
	
});

//	===================================================
// 	Defaults
//	===================================================
// 	Default taks
gulp.task('default', function(callback) {
	
	runSequence(
    	'buildStyles',
    callback);
	
});

//	===================================================
// 	Runs all the watch scripts
//	===================================================
// Watches for the scss
gulp.watch(
	['./css/**/*.scss'], // Files to watch
	['buildStyles']	//Tasks to Run
);