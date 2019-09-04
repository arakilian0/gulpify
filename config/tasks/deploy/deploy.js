let yargs = require('yargs').argv;

module.exports = function (cb) {
	if(!yargs.default && !yargs.d && !yargs.D && !yargs.clearCache && !yargs.c && !yargs.C) { require('./msg/help')() };

	if(yargs.default || yargs.d || yargs.D) { require('./options/default')() };
	if(yargs.clearCache || yargs.c || yargs.C) { require('./options/clearCache')() };
  cb();
};
