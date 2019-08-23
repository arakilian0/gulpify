let yargs = require('yargs').argv;

module.exports = function (cb) {
	if(!yargs.view) { require('./msg/help')() };

	if(yargs.view) { require('./options/view')() };
  cb();
};
