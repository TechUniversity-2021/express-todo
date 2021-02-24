const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const todos = await todoService.getTodos();
  res.status(200).send(todos);
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await todoService.getTodo(id);
  if (todo.length === 0) return res.status(404).send('ID not found');
  return res.status(200).send(todo);
};

const createTodo = async (req, res) => {
  const ack = await todoService.createTodo(req.body);
  res.status(201).send(ack);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await todoService.updateTodo(id, req.body);
  if (updatedTodo.length === 0) {
    return res.status(404).send('ID not found');
  }
  return res.status(200).send(updatedTodo);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const ack = await todoService.deleteTodo(id);
  if (ack.length === 0) {
    return res.status(404).send('ID not found');
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
