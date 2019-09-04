let chalk = require('chalk');
let print = console.log;

module.exports = function () {
  print(chalk.blue.bold('Usage: ') + 'gulp deploy' + chalk.bold(' [options]'));
	print('');
  print(chalk.bold('  --default') + '          ' + chalk.gray('Create a new view with PUG and YAML'));
  print(chalk.bold('  --clear-cache') + '      ' + chalk.gray('Create a new view with PUG and YAML'));
	print('');
};
