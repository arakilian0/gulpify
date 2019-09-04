const _default = require('./config/tasks/default/default');
const _create = require('./config/tasks/create/create');
const _build = require('./config/tasks/build/build');
const _runserver = require('./config/tasks/runserver/runserver');
const _deploy = require('./config/tasks/deploy/deploy');

exports.default = _default;
exports.create = _create;
exports.build = _build;
exports.runserver = _runserver;
exports.deploy = _deploy;
