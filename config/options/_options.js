let fs = require('fs');
let path = require('path');
let yaml = require('js-yaml');

let server_options = yaml.safeLoad(fs.readFileSync(path.resolve('config', 'options', 'server.yml'), 'utf8'));
let sass_options = yaml.safeLoad(fs.readFileSync(path.resolve('config', 'options', 'sass.yml'), 'utf8'));
let webpack_options = yaml.safeLoad(fs.readFileSync(path.resolve('config', 'options', 'webpack.yml'), 'utf8'));
let icon_options = yaml.safeLoad(fs.readFileSync(path.resolve('config', 'options', 'icon.yml'), 'utf8'));
let deployment_options = yaml.safeLoad(fs.readFileSync(path.resolve('config', 'options', 'deployment.yml'), 'utf8'));

module.exports = {
	server: server_options,
	sass: sass_options,
	webpack: webpack_options,
	icon: icon_options,
	deployment: deployment_options
};
