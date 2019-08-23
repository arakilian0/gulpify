let yargs = require('yargs').argv;
let print = console.log;
let path = require('path');
let yaml = require('js-yaml');
let fs = require('fs');
let paths = require('./../../../paths/_paths');
let chalk = require('chalk');
let createView = require('./../../../lib/createView');
let fileExistsMessage = `\n  ${chalk.red('error:')} view already exists\n`;

module.exports = function() {
  if(yargs.view === true) { require('./../msg/help')() }
	else {
		if(yargs.view.includes('/')) {
			let splitPath = yargs.view.split('/');
			try {
			  let template = yaml.safeLoad(fs.readFileSync(paths.source.data.main, 'utf8'));
				let viewExists = false;
				if(template.views) {
					template.views.forEach(view => { if(yargs.view === view) { viewExists = true } });
					if(viewExists) { print(fileExistsMessage) }
					else { createView('path', splitPath) }
				}
				else { createView('path', splitPath) }
			} catch (error) { print(error) }
		}
		else {
			try {
			  let template = yaml.safeLoad(fs.readFileSync(paths.source.data.main, 'utf8'));
				let viewExists = false;
				if(template.views) {
					template.views.forEach(view => { if(yargs.view === view) { viewExists = true } });
					if(viewExists) { print(fileExistsMessage) }
					else { createView('file', yargs.view) }
				}
				else { createView('file', yargs.view) }
			} catch (error) { print(error) }
		};
	};
};
