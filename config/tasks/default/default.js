let chalk = require('chalk');
let print = console.log;

module.exports = function (cb) {
  print(chalk.blue.bold('Usage: ') + 'gulp ' + chalk.bold('<task> [options]'));
	print('');
  print(chalk.bold('  create') + '        ' + chalk.gray('Process src files into a distributable folder.'));
  print(chalk.bold('  build') + '         ' + chalk.gray('Process src files into a distributable folder.'));
	print('');
	cb();
};
