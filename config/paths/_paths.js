let fs = require('fs');
let path = require('path');
let yaml = require('js-yaml');

let source_paths = yaml.safeLoad(fs.readFileSync(path.resolve('config', 'paths', 'source.yml'), 'utf8'));
let build_paths = yaml.safeLoad(fs.readFileSync(path.resolve('config', 'paths', 'build.yml'), 'utf8'));
let test_paths = yaml.safeLoad(fs.readFileSync(path.resolve('config', 'paths', 'test.yml'), 'utf8'));

module.exports = {
  source: source_paths,
	build: build_paths,
	test: test_paths
};
