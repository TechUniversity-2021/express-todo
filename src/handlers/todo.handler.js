const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const todo = await todoService.getTodos();
  res.status(200).send(todo);
};

const createTodo = async (req, res) => {
  const ack = await todoService.createTodo(req.body);
  res.status(200).send(ack);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const ack = await todoService.updateTodo(id, req.body);
  res.status(200).send(ack);
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
};
