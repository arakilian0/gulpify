let yargs = require('yargs').argv;
let print = console.log;
let path = require('path');
let yaml = require('js-yaml');
let fs = require('fs');
let paths = require('./../paths/_paths');
let chalk = require('chalk');
let mkdirp = require('mkdirp');

module.exports = function(type, yarg) {
	if(type === 'file') {
		fs.appendFile(paths.source.data.main, `- ${yarg} \n`, function (err) {
			if (err) throw err;
		});
		mkdirp(path.resolve(paths.source.main), function (err) {
			fs.writeFile(path.resolve(paths.source.main, `${yarg}.pug`), 'extends assets/components/template.pug\nblock body', { flag: 'wx' }, function (err) {
				if (err) throw err;
			});
		});
		// mkdirp(path.resolve(paths.source.script.views), function (err) {
		// 	fs.writeFile(path.resolve(paths.source.script.views, `${yarg}.js`), '', { flag: 'wx' }, function (err) {
		// 		if (err) throw err;
		// 	});
		// });
		// mkdirp(path.resolve(paths.source.style.views), function (err) {
		// 	fs.writeFile(path.resolve(paths.source.style.views, `${yarg}.scss`), '', { flag: 'wx' }, function (err) {
		// 		if (err) throw err;
		// 	});
		// });
		mkdirp(path.resolve(paths.source.data.views), function (err) {
			fs.writeFile(path.resolve(paths.source.data.views, `${yarg}.yml`), '', { flag: 'wx' }, function (err) {
				if (err) throw err;
				fs.copyFile(paths.source.data.boiler, path.resolve(paths.source.data.views, `${yarg}.yml`), (err) => {
					if (err) throw err;
				});
			});
		});
	}
	if(type === 'path') {
		let filename = yarg[yarg.length-1];
		let fullPath = path.join(...yarg);
		let viewPath = yarg;
				viewPath.pop();
				viewPath = path.join(...viewPath);

		let levelCount = viewPath.split('/').length;
		let level = '';
		for(let x = 0; x < levelCount; x++) {
			level += '../';
		}

		fs.appendFile(paths.source.data.main, `- ${fullPath}\n`, function (err) {
			if (err) throw err;
		});

		mkdirp(path.resolve(paths.source.main, viewPath), function (err) {
			if (err) return cb(err);
			fs.writeFile(path.resolve(paths.source.main, viewPath, `${filename}.pug`), `extends ${level}assets/components/template.pug\nblock body`, { flag: 'wx' }, function (err) {
				if (err) throw err;
			});
		});
		// mkdirp(path.resolve(paths.source.style.views, viewPath), function (err) {
		// 	if (err) return cb(err);
		// 	fs.writeFile(path.resolve(paths.source.style.views, viewPath, `${filename}.scss`), '', { flag: 'wx' }, function (err) {
		// 		if (err) throw err;
		// 	});
		// });
		// mkdirp(path.resolve(paths.source.script.views, viewPath), function (err) {
		// 	if (err) return cb(err);
		// 	fs.writeFile(path.resolve(paths.source.script.views, viewPath, `${filename}.js`), '', { flag: 'wx' }, function (err) {
		// 		if (err) throw err;
		// 	});
		// });
		mkdirp(path.resolve(paths.source.data.views, viewPath), function (err) {
			if (err) return cb(err);
			fs.writeFile(path.resolve(paths.source.data.views, viewPath, `${filename}.yml`), '', { flag: 'wx' }, function (err) {
				if (err) throw err;
				fs.copyFile(paths.source.data.boiler, path.resolve(paths.source.data.views, viewPath, `${filename}.yml`), (err) => {
					if (err) throw err;
				});
			});
		});
	}
};
