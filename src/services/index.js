const {
  getAllTodo, createTodo, getTodo, deleteAllTodo, updateTodo, deleteStatusTodo, deleteTodo,
} = require('./todo.service');

module.exports = {
  getAllTodo,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
  deleteStatusTodo,
};
