let gulp = require('gulp');
let pug = require('gulp-pug');
let data = require('gulp-data');
let beautify = require('gulp-beautify');
let gulpif = require('gulp-if');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let webpack = require('webpack-stream');

let yargs = require('yargs').argv;
let print = console.log;
let path = require('path');
let yaml = require('js-yaml');
let fs = require('fs');
let options = require('./../../../options/_options');
let paths = require('./../../../paths/_paths');
let chalk = require('chalk');
let errorMessage1 = 'no views detected';
let errorMessage2 = 'missing .yml data';
let errorMessage3 = 'some .yml files are missing data';
let sassFailed = false;

module.exports = function() {
	// build html
	let promise = new Promise(function(resolve, reject) {
		try {
			let template = yaml.safeLoad(fs.readFileSync(path.resolve(paths.source.data.main), 'utf8'));
			if(template.views !== null) {
				template.views.forEach(view => {
					try {
						let templateData = yaml.load(fs.readFileSync(path.resolve(paths.source.data.views, `${view}.yml`), 'utf8'));
						if(templateData !== undefined) {
							if(view.includes('/')) {
								let pathToView = view.split('/');pathToView.pop();pathToView = path.join(...pathToView);
								print(`\n  ${chalk.green('success:')} ${chalk.bold(view+'.pug')} was built with ${chalk.bold(view+'.yml')}\n`);
								gulp.src(`${paths.source.main}/${view}.pug`)
									.pipe(gulpif(templateData, data(function(file) { return templateData })))
									.pipe(pug())
									.pipe(gulpif(!yargs.prod, beautify.html()))
									.pipe(gulp.dest(`${paths.build.main}/${pathToView}`));
								resolve();
							}
							else {
								print(`\n  ${chalk.green('success:')} ${chalk.bold(view+'.pug')} was built with ${chalk.bold(view+'.yml')}\n`);
								gulp.src(`${paths.source.main}/${view}.pug`)
									.pipe(gulpif(templateData, data(function(file) { return templateData })))
									.pipe(pug())
									.pipe(gulpif(!yargs.prod, beautify.html()))
									.pipe(gulp.dest(`${paths.build.main}/`));
								resolve();
							}
						}
						else {
							let templateBoiler = yaml.load(fs.readFileSync(path.resolve(paths.source.data.boiler), 'utf8'));
							if(templateBoiler) {
								if(view.includes('/')) {
									let pathToView = view.split('/');pathToView.pop();pathToView = path.join(...pathToView);
									print(`\n  ${chalk.yellow('warning:')} ${chalk.bold(view+'.yml')} file is empty ${chalk.gray('(built with boiler data)')}\n`);
									gulp.src(`${paths.source.main}/${view}.pug`)
										.pipe(gulpif(templateBoiler, data(function(file) { return templateBoiler })))
										.pipe(pug())
										.pipe(gulpif(!yargs.prod, beautify.html()))
										.pipe(gulp.dest(`${paths.build.main}/${pathToView}`));
									resolve();
								}
								else {
									print(`\n  ${chalk.yellow('warning:')} ${chalk.bold(view+'.yml')} file is empty ${chalk.gray('(built with boiler data)')}\n`);
									gulp.src(`${paths.source.main}/${view}.pug`)
										.pipe(gulpif(templateBoiler, data(function(file) { return templateBoiler })))
										.pipe(pug())
										.pipe(gulpif(!yargs.prod, beautify.html()))
										.pipe(gulp.dest(`${paths.build.main}/`));
									resolve();
								}
							}
						}
					}
					catch(error) {
						let templateBoiler = yaml.load(fs.readFileSync(path.resolve(paths.source.data.boiler), 'utf8'));
						if(templateBoiler) {
							if(view.includes('/')) {
								let pathToView = view.split('/');pathToView.pop();pathToView = path.join(...pathToView);
								print(`\n  ${chalk.yellow('warning:')} ${chalk.bold(view+'.pug')} has no data file ${chalk.gray('(built with boiler data)')}\n`);
								gulp.src(`${paths.source.main}/${view}.pug`)
									.pipe(gulpif(templateBoiler, data(function(file) { return templateBoiler })))
									.pipe(pug())
									.pipe(gulpif(!yargs.prod, beautify.html()))
									.pipe(gulp.dest(`${paths.build.main}/${pathToView}`));
								resolve();
							}
							else {
								print(`\n  ${chalk.yellow('warning:')} ${chalk.bold(view+'.pug')} has no data file ${chalk.gray('(built with boiler data)')}\n`);
								gulp.src(`${paths.source.main}/${view}.pug`)
									.pipe(gulpif(templateBoiler, data(function(file) { return templateBoiler })))
									.pipe(pug())
									.pipe(gulpif(!yargs.prod, beautify.html()))
									.pipe(gulp.dest(`${paths.build.main}/`));
								resolve();
							}
						}
					}
				});
			} else { print(`\n  ${chalk.red('error:')} no views detected\n`); reject(); }
		} catch(error) { print(chalk.red.bold("Something went wrong: "), error); reject(); }
	});
	// END build html

  // build sass
	promise.
	  then(function () {
			// development mode
			if(!yargs.prod) {
				gulp.src(`${paths.source.styles.main}`)
					.pipe(sass(options.sass.dev.options))
						.on('error', function (error) {
							print(`\n  ${chalk.red('error:')} something went wrong during Sass processing.\n`);
							print(error.message.toString());
							this.emit('end');
							sassFailed = true;
						})
					.pipe(rename(options.sass.dev.output))
					.pipe(gulp.dest(`${paths.build.styles.main}`));
				if(!sassFailed) {
					print(`\n  ${chalk.green('success:')} ${chalk.bold('main.sass')} was built with no errors (${chalk.bold(options.sass.dev.output)})\n`);
				}
			}
			// production mode
			else {
				gulp.src(`${paths.source.styles.main}`)
					.pipe(sass(options.sass.prod.options))
						.on('error', function (error) {
							print(`\n  ${chalk.red('error:')} something went wrong during Sass processing.\n`);
							print(error);
							this.emit('end');
							sassFailed = true;
						})
					.pipe(rename(options.sass.prod.output))
					.pipe(gulp.dest(`${paths.build.styles.main}`));
				if(!sassFailed) {
					print(`\n  ${chalk.green('success:')} ${chalk.bold('main.sass')} was built with no errors (${chalk.bold(options.sass.prod.output)})\n`);
				}
			}
	  }).
	  catch(function () {});
  // END build sass

	// build javascript
	promise.
	  then(function () {
			gulp.src(paths.source.scripts.main)
			  .pipe(gulpif(yargs.prod, webpack(options.webpack.prod), webpack(options.webpack.dev)))
			  .pipe(gulp.dest(paths.build.scripts.main));
	  }).
	  catch(function () {});
	// END build javascript
};
