let yargs = require('yargs').argv;

module.exports = function (cb) {
	if(!yargs.views) { require('./msg/help')() };

	if(yargs.views) { require('./options/templates')() };
  cb();
};
