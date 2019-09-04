let child_process = require('child_process');
let options = require('./../../../options/_options');
let paths = require('./../../../paths/_paths');
let yargs = require('yargs').argv;
let print = console.log;
let chalk = require('chalk');

module.exports = function() {
	child_process.exec(
		`cd ${paths.build.main} && aws s3 sync ./ s3://${options.deployment.bucket}/ --delete`,
		{},
		function(error, stdout, stderr) {
			process.stdout.write(stdout + '\n');
			process.stderr.write(stderr + '\n');
			if (error !== null) {
				console.log(error.message);
			}
			else {
				print(`  ${chalk.green('success:')} uploaded all ${chalk.bold(paths.build.main)} content to ${chalk.bold(`s3://${options.deployment.bucket}`)}\n`);
				print(`  ${chalk.yellow('warning:')} cloudfront distribution is still serving old content`);
				print(`  ${chalk.gray('run \'gulp deploy --clear-cache\' to invalidate global caches')}\n`);
			}
	});
};
