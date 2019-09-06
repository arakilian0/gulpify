let yargs = require('yargs').argv;

module.exports = function (cb) {
	if(!yargs.views && !yargs.assets) { require('./msg/help')() };

	if(yargs.views) { require('./options/views')() };
	if(yargs.assets) { require('./options/assets')() };
  cb();
};
