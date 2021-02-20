const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const todo = await todoService.getTodos();
  res.status(200).send(todo);
};

module.exports = {
  getTodos,
};
