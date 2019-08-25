let chalk = require('chalk');
let print = console.log;

module.exports = function () {
  print(chalk.blue.bold('Usage: ') + 'gulp create' + chalk.bold(' [options]'));
	print('');
  print(chalk.bold('  --view') + '      ' + chalk.gray('Create a new view with PUG and YAML'));
	print('');
};
