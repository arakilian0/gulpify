let chalk = require('chalk');
let print = console.log;

module.exports = function (cb) {
  print(chalk.blue.bold('Usage: ') + 'gulp ' + chalk.bold('<task> [options]'));
	print('');
  print(chalk.bold('  create') + '       ' + chalk.gray('Create new resources for the project.'));
  print(chalk.bold('  build') + '        ' + chalk.gray('Process src/ files for distribution.'));
  print(chalk.bold('  runserver') + '    ' + chalk.gray('Local development server using BrowserSync.'));
  print(chalk.bold('  deploy') + '       ' + chalk.gray('Push changes to pre configured AWS services.'));
	print('');
	cb();
};
