let print = console.log;
let chalk = require('chalk');

module.exports = function () {
  print(chalk.blue.bold('Usage: ') + 'gulp runserver ' + chalk.bold('[options]'));
	print('');
	print('  ' + chalk.bold('--default') + '       ' + chalk.gray('Ignore all other arguments, and run default server options.'));
	print('  ' + chalk.bold('--path') + '          ' + chalk.gray('Initiate the server on a specific path. Enter a path you want to serve.'));
	print('  ' + chalk.bold('--open') + '          ' + chalk.gray('Open a browser on the path that is being served. Default is equal to false.'));
  print('  ' + chalk.bold('--NUMBER') + '        ' + chalk.gray('Initiate server on a specific port. Enter a 4 digit value.'));
  print('  ' + chalk.bold('--ui-NUMBER') + '     ' + chalk.gray('Initiate server GUI on a specific port. Enter a 4 digit value following the `ui-`.'));
	print('');
};
