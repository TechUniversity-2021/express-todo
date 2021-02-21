const {
  getAllTodoHandler, postTodoHandler, getTodoHandler, updateTodoHandler,
} = require('./todo.handler');
const { healthHandler } = require('./health.handler');

module.exports = {
  getAllTodoHandler,
  healthHandler,
  postTodoHandler,
  getTodoHandler,
  updateTodoHandler,
};
