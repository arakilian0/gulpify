// Tasks get imported from config/tasks/<task>/<task.js>
const _default = require('./config/tasks/default/default');
const _create = require('./config/tasks/create/create');
const _build = require('./config/tasks/build/build');
const _runserver = require('./config/tasks/runserver/runserver');

// The default task
exports.default = _default;

// Pipeline tasks
exports.create = _create;
exports.build = _build;
exports.runserver = _runserver;
