let yargs = require('yargs').argv;

module.exports = function (cb) {
	if(!yargs.templates) { require('./msg/help')() };

	if(yargs.templates) { require('./options/templates')() };
  cb();
};
