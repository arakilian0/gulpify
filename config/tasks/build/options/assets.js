let print = console.log;
let chalk = require('chalk');
let gulp = require('gulp');
let iconfont = require('gulp-iconfont');
let iconfontCSS = require('gulp-iconfont-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');

let options = require('./../../../options/_options');
let paths = require('./../../../paths/_paths');
let sassFailed = false;

module.exports = function() {
	let promise = new Promise(function(resolve, reject) {
		gulp.src(`${paths.source.icons}`)
	    .pipe(iconfontCSS(options.icon.css))
	    .pipe(iconfont(options.icon.font))
	    .pipe(gulp.dest(`${paths.source.fonts.iconfonts}`));
		resolve();
	});

	promise.
		then(function () {
			gulp.src(`${paths.source.fonts.iconfonts}/*.**`)
				.pipe(gulp.dest(`${paths.build.fonts.iconfonts}`));
		}).
		catch(function () {
				console.log('Some error has occured');
	});

	promise.
		then(function () {
			gulp.src(`${paths.source.fonts.webfonts}/**/**/**/**/**/*.**`)
				.pipe(gulp.dest(`${paths.build.fonts.webfonts}`));
		}).
		catch(function () {
				console.log('Some error has occured');
	});

  // START imagemin
	// promise.
	// 	then(function () {
	// 		gulp.src(`${paths.source.fonts.webfonts}/**/**/**/**/**/*.**`)
	// 			.pipe(gulp.dest(`${paths.build.fonts.webfonts}`));
	// 	}).
	// 	catch(function () {
	// 			console.log('Some error has occured');
	// });
};
