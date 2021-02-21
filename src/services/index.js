const {
  getAllTodo, postTodo, getTodo, deleteAllTodo,
} = require('./todo.basic.service');
const { updateTodo, deleteTodo } = require('./todo.service');

module.exports = {
  getAllTodo,
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
};
