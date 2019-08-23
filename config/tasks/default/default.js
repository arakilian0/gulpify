let chalk = require('chalk');
let print = console.log;

module.exports = function (cb) {
  print(chalk.blue.bold('Usage: ') + 'gulp ' + chalk.bold('<task> [options]'));
	print('');
  print(chalk.bold('  create') + '       ' + chalk.gray('help message coming soon'));
  print(chalk.bold('  build') + '        ' + chalk.gray('help message coming soon'));
	print('');
	print(chalk.gray('  *more coming soon*'));
	print('');
	cb();
};
