let chalk = require('chalk');
let print = console.log;

module.exports = function () {
  print(chalk.blue.bold('Usage: ') + 'gulp build' + chalk.bold(' [options]'));
	print('');
  print(chalk.bold('  create') + '        ' + chalk.gray('Process src files into a distributable folder.'));
  print(chalk.bold('  delete') + '        ' + chalk.gray('Process src files into a distributable folder.'));
  print(chalk.bold('  build') + '         ' + chalk.gray('Process src files into a distributable folder.'));
  print(chalk.bold('  watch') + '         ' + chalk.gray('Process src files into a distributable folder.'));
  print(chalk.bold('  runserver') + '     ' + chalk.gray('Process src files into a distributable folder.'));
  print(chalk.bold('  deploy') + '        ' + chalk.gray('Process src files into a distributable folder.'));
  print(chalk.bold('  query') + '         ' + chalk.gray('Process src files into a distributable folder.'));
	print('');
};
