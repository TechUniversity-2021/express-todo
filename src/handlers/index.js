const {
  getTodos, createTodo, updateTodo, deleteTodo, getTodoById
} = require('./todo.handler');

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
};
