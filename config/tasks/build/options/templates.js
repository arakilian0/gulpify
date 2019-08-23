let gulp = require('gulp');
let pug = require('gulp-pug');
let data = require('gulp-data');
let beautify = require('gulp-beautify');
let gulpif = require('gulp-if');

let yargs = require('yargs').argv;
let print = console.log;
let path = require('path');
let yaml = require('js-yaml');
let fs = require('fs');
let paths = require('./../../../paths/_paths');
let chalk = require('chalk');
let errorMessage1 = 'no views detected';
let errorMessage2 = 'missing .yml data';
let errorMessage3 = 'some .yml files are missing data';

module.exports = function() {
	try {
		let template = yaml.safeLoad(fs.readFileSync(path.resolve(paths.source.data.main), 'utf8'));
		if(template.views !== null) {
			template.views.forEach(view => {
				try {
					let templateData = yaml.load(fs.readFileSync(path.resolve(paths.source.data.views, `${view}.yml`), 'utf8'));
					if(templateData !== undefined) {
						if(view.includes('/')) {
							let pathToView = view.split('/');pathToView.pop();pathToView = path.join(...pathToView);
							print(`\n  success: ${chalk.bold(view+'.pug')} was built with ${chalk.bold(view+'.yml')}\n`);
							gulp.src(`${paths.source.main}/${view}.pug`)
								.pipe(gulpif(templateData, data(function(file) { return templateData })))
								.pipe(pug())
								.pipe(gulpif(!yargs.prod, beautify.html()))
								.pipe(gulp.dest(`${paths.build.main}/${pathToView}`));
						}
						else {
							print(`\n  success: ${chalk.bold(view+'.pug')} was built with ${chalk.bold(view+'.yml')}\n`);
							gulp.src(`${paths.source.main}/${view}.pug`)
								.pipe(gulpif(templateData, data(function(file) { return templateData })))
								.pipe(pug())
								.pipe(gulpif(!yargs.prod, beautify.html()))
								.pipe(gulp.dest(`${paths.build.main}/`));
						}
					}
					else {
						if(view.includes('/')) {
							let pathToView = view.split('/');pathToView.pop();pathToView = path.join(...pathToView);
							print(`\n  warning: ${chalk.bold(view+'.yml')} file is empty ${chalk.gray('(building without data)')}\n`);
							gulp.src(`${paths.source.main}/${view}.pug`)
								.pipe(pug())
								.pipe(gulpif(!yargs.prod, beautify.html()))
								.pipe(gulp.dest(`${paths.build.main}/${pathToView}`));
						}
						else {
							print(`\n  warning: ${chalk.bold(view+'.yml')} file is empty ${chalk.gray('(building without data)')}\n`);
							gulp.src(`${paths.source.main}/${view}.pug`)
								.pipe(pug())
								.pipe(gulpif(!yargs.prod, beautify.html()))
								.pipe(gulp.dest(`${paths.build.main}/`));
						}
					}
				}
				catch(error) {
						if(view.includes('/')) {
							let pathToView = view.split('/');pathToView.pop();pathToView = path.join(...pathToView);
							print(`\n  warning: ${chalk.bold(view+'.pug')} has no data file ${chalk.gray('(building without data)')}\n`);
							gulp.src(`${paths.source.main}/${view}.pug`)
								.pipe(pug())
								.pipe(gulpif(!yargs.prod, beautify.html()))
								.pipe(gulp.dest(`${paths.build.main}/${pathToView}`));
						}
						else {
							print(`\n  warning: ${chalk.bold(view+'.pug')} has no data file ${chalk.gray('(building without data)')}\n`);
							gulp.src(`${paths.source.main}/${view}.pug`)
								.pipe(pug())
								.pipe(gulpif(!yargs.prod, beautify.html()))
								.pipe(gulp.dest(`${paths.build.main}/`));
						}
				}
			});
		}
		else { print('\n  error: no views detected\n') }
	}
	catch(error) { print("something went wrong: ", error) }
};
