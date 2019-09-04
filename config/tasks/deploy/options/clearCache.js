let child_process = require('child_process');
let options = require('./../../../options/_options');
let paths = require('./../../../paths/_paths');
let yargs = require('yargs').argv;
let print = console.log;
let chalk = require('chalk');

module.exports = function() {
	let promise = new Promise(function(resolve, reject) {
		child_process.exec(
			`cd ${paths.build.main} && aws s3 sync ./ s3://${options.deployment.bucket}/ --delete`,
			{},
			function(error, stdout, stderr) {
				process.stdout.write(stdout + '\n');
				process.stderr.write(stderr + '\n');
				if (error !== null) {
					console.log(error.message);
					reject();
				}
				else {
					print(`  ${chalk.green('success:')} uploaded all ${chalk.bold(paths.build.main)} content to ${chalk.bold(`s3://${options.deployment.bucket}`)}\n`);
					resolve();
				}
		});
	});

	promise.
		then(function () {
			child_process.exec(
				`aws cloudfront create-invalidation --distribution-id ${options.deployment.distribution} --paths '/*'`,
				{},
				function(error, stdout, stderr) {
					process.stdout.write(stdout + '\n');
					process.stderr.write(stderr + '\n');
					if (error !== null) {
						console.log(error.message);
					}
			});
		}).
		catch(function () {
				console.log('Some error has occured');
	});
};
