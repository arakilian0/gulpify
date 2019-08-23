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
let errorMessage2 = 'missing .yml data files';
let errorMessage3 = 'some .yml files are missing data';
let views;
let dataExists;

module.exports = function() {
	try {
	  let template = yaml.safeLoad(fs.readFileSync(path.resolve(paths.source.data.main), 'utf8'));
		if(template.views) { views = true }
		template.views.forEach(view => {
			try {
				let templateData = yaml.load(fs.readFileSync(path.resolve(paths.source.data.views, `${view}.yml`), 'utf8'));
				if(templateData) { dataExists = true }
				gulp.src(`${paths.source.main}/${view}*.pug`)
					.pipe(gulpif(dataExists, data(function(file) { return templateData })))
					.pipe(pug())
					.pipe(gulpif(!yargs.prod, beautify.html()))
					.pipe(gulp.dest(`${paths.build.main}/`));
			} catch(error) { print(errorMessage2) }
			if(!dataExists) {
				print('missing data in yml file');
				print('building .pug files');
				gulp.src([`${paths.source.main}/**/**/**/**/**/**/**/**/**/*.pug`, `!${paths.source.main}/**/**/**/**/**/**/**/**/**/component.*.pug`])
					.pipe(pug())
					.pipe(gulpif(!yargs.prod, beautify.html()))
					.pipe(gulp.dest(`${paths.build.main}/`));
			}
		});
	} catch (error) { print(errorMessage1) }
	if(!views) {
		print('building .pug files');
		gulp.src([`${paths.source.main}/**/**/**/**/**/**/**/**/**/*.pug`, `!${paths.source.main}/**/**/**/**/**/**/**/**/**/component.*.pug`])
			.pipe(pug())
			.pipe(gulpif(!yargs.prod, beautify.html()))
			.pipe(gulp.dest(`${paths.build.main}/`));
	}
};
