const {
  getAllTodoHandler, postTodoHandler, getTodoHandler,
  updateTodoHandler, deleteTodoHandler, deleteAllTodoHandler,
  deleteStatusTodoHandler,
} = require('./todo.handler');
const { healthHandler } = require('./health.handler');

module.exports = {
  getAllTodoHandler,
  healthHandler,
  postTodoHandler,
  getTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  deleteAllTodoHandler,
  deleteStatusTodoHandler,
};
