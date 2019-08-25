let chalk = require('chalk');
let print = console.log;

module.exports = function () {
	print(chalk.blue.bold('Usage: ') + 'gulp build' + chalk.bold(' [options]'));
	print('');
  print(chalk.bold('  --views') + '     ' + chalk.gray('Compile all PUG files into HTML'));
	print('');
};
