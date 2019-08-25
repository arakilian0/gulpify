let paths = require('./../paths/_paths');
let package = require('./../../package.json');

module.exports = {
	server: `./${paths.build.main}`,
	notify: false,
	open: false,
	logPrefix: `${package.name} v${package.version}`,
	logLevel: 'debug',
	logFileChanges: true,
	logConnections: true,
	port: 8000,
	ui: {
		port: 8080
	}
};
