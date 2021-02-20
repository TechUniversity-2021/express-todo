const { getAllTodoHandler, postTodoHandler } = require('./todo.handler');
const { healthHandler } = require('./health.handler');

module.exports = {
  getAllTodoHandler,
  healthHandler,
  postTodoHandler,
};
