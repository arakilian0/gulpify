let gulp = require('gulp');
let yargs = require('yargs').argv;
let server = require('browser-sync');
let print = console.log;
let isNumber = require('./../../lib/isNumber');
let options = require('./../../options/_options').server;
let givenArguments = ['_'];

module.exports = function (cb) {

	if(yargs.d || yargs.default || yargs.D) { givenArguments.push('d'); }
	else {
		for(let key in yargs) {
			if(key == '_' || key == '$0') { continue }
			else {
				/* Open Handler */
				if(key == 'open' || key == 'o' || key == 'O') {
					options.open = true;
					givenArguments.push(key);
				};
				/* Port Handler */
				if(isNumber(key[0]) && isNumber(key[1]) && isNumber(key[2]) && isNumber(key[3])) {
					options.port = Number(key);
					givenArguments.push(Number(key));
				};
				/* UI Port Handler */
				if(key[0] == 'u' && key[1] == 'i' && key[2] == '-') {
					let uiPort = '';
					for(let idx = 0; idx < key.length; idx++) {
						if(key[idx] == 'u' || key[idx] == 'i' || key[idx] == '-') { continue }
						else { uiPort += key[idx] };
					};
					options.ui.port = Number(uiPort);
					givenArguments.push(Number(uiPort));
				};
				/* Path Handler */
				if(yargs.path || yargs.p || yargs.P) {
					givenArguments.push(key);
					if(yargs.path && yargs.path !== true) { options.server = yargs.path }
					if(yargs.p && yargs.p !== true) { options.server = yargs.p }
					if(yargs.P && yargs.P !== true) { options.server = yargs.P }
				}
			};
		};
	};

	if(!givenArguments[1]) { require('./msg/help')() }
	else {
		server.init(options);
		gulp.watch(`${options.server}/**/**/**/**/**/**/**/*.html`).on('change', server.reload);
		// gulp.watch('dist/assets/styles/all.css').on('change', server.reload);
		// gulp.watch('dist/assets/styles/all.min.css').on('change', server.reload);
		// gulp.watch('dist/assets/scripts/all.js').on('change', server.reload);
		// gulp.watch('dist/assets/scripts/all.min.js').on('change', server.reload);
	};
  cb();
};
