/*eslint no-undef: "error"*/
/*eslint-env node*/

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['watch']);

gulp.task('build-main', function (cb) {
	pump([
		gulp.src(['./src/js/common/*.js','./src/js/main/*.js']),
		sourcemaps.init(),
		babel(),
		concat('bundle.main.js'),
		uglify(),
		sourcemaps.write('.'),
		gulp.dest('./dist/js')
	],
	cb);
});

gulp.task('build-restaurant-info', function (cb) {
	pump([
		gulp.src(['./src/js/common/*.js','./src/js/restaurant_info/*.js']),
		sourcemaps.init(),
		babel(),
		concat('bundle.restaurant-info.js'),
		uglify(),
		sourcemaps.write('.'),
		gulp.dest('./dist/js')
	],
	cb);
});

gulp.task('copy-images', function(cb){
	pump([
		gulp.src('./src/img/**/*'),
		gulp.dest('./dist/assets/img/')
	], 
	cb);
});

gulp.task('build-scss', function(cb){
	pump([
		gulp.src('./src/scss/**/*.scss'),
		sass({outputStyle: 'compressed'}).on('error', sass.logError),
		autoprefixer(),
		gulp.dest('./dist/styles/')
	],
	cb);
});

gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['build-main', 'build-restaurant-info']);
	gulp.watch('./src/scss/**/*.scss', ['build-scss']);
	gulp.start('copy-images');
	// pump([
	// 	gulp.watch('./src/js/**/*.js', ['build-main', 'build-restaurant-info']),
	// 	gulp.watch('./src/scss/**/*.scss', ['build-scss']),
	// 	gulp.start('copy-images')
	// ],
	// cb);	
});