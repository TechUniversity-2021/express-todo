const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const todos = await todoService.getTodos();
  res.status(200).send(todos);
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await todoService.getTodo(id);
  if (todo === 'Todo with given id not found') {
    return res.status(404).send(todo);
  }
  return res.status(200).send(todo);
};

const createTodo = async (req, res) => {
  const ack = await todoService.createTodo(req.body);
  res.status(201).send(ack);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const ack = await todoService.updateTodo(id, req.body);
  if (ack === 'Todo with given id not found') {
    return res.status(404).send(ack);
  }
  return res.status(200).send(ack);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const ack = await todoService.deleteTodo(id);
  if (ack === 'Todo with given id not found') {
    return res.status(404).send(ack);
  }
  return res.status(200).send(ack);
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  getTodo,
  deleteTodo,
};
