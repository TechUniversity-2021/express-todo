const {
  todoHandler: getTodo, createTodo, getTodoById, updateTodo, deleteTodo,
} = require('./todo.handler');

module.exports = {
  getTodo,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
