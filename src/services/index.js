const { getAllTodo, postTodo, getTodo } = require('./todo.basic.service');
const { updateTodo, deleteTodo } = require('./todo.service');

module.exports = {
  getAllTodo,
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
};
