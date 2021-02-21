const { getAllTodoHandler, postTodoHandler, getTodoHandler } = require('./todo.handler');
const { healthHandler } = require('./health.handler');

module.exports = {
  getAllTodoHandler,
  healthHandler,
  postTodoHandler,
  getTodoHandler,
};
