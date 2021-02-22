const {
  getAllTodo, createTodo, getTodo, deleteAllTodo, updateTodo,
} = require('./todo.basic.service');
const { deleteTodo, deleteStatusTodo } = require('./todo.service');

module.exports = {
  getAllTodo,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
  deleteStatusTodo,
};
