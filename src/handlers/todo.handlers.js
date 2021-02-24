/* eslint-disable no-console */
const todosService = require('../services/todo.services');

const deleteByIdToDoHandler = async (req, res) => {
  // console.log("here");
  const deletedToDo = await todosService.deleteById(req, res);
  res.status(200).send(deletedToDo);
};

const getTodosHandlerById = async (req, res) => {
  const { id } = req.params;

  const todo = await todosService.getTodosById(id);
  // console.log(todo)
  res.status(200).send(todo);
};
const getTodosHandler = async (req, res) => {
  const todo = await todosService.getTodos();
  console.log(todo);
  res.status(200).send(todo);
};

const createTodo = async (req, res) => {
  const todo = await todosService.createTodo(req.body);

  res.status(201).send(todo);
};

const updateTodoHandler = async (req, res) => {
  const id = req.params;

  const todo = await todosService.updateTodo(id, req.body);
  res.status(200).send(todo);
};

module.exports = {
  getTodosHandler,
  createTodo,
  updateTodoHandler,
  getTodosHandlerById,
  deleteByIdToDoHandler,
};
