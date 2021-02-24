const todoServices = require('../services');
const NonExistentError = require('../errors/nonExistent.errors');

const getAllTodoHandler = async (req, res) => {
  try {
    const allTodos = await todoServices.getAllTodo();
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(500).send();
  }
};
const postTodoHandler = async (req, res) => {
  try {
    const { body } = req;
    const createdTodo = await todoServices.createTodo(body);
    res.status(201).send(createdTodo);
  } catch (error) {
    res.status(500).send();
  }
};
const getTodoHandler = async (req, res) => {
  try {
    const { params } = req;
    const requiredTodoId = params.id;
    const todo = await todoServices.getTodo(requiredTodoId);
    return res.status(200).send(todo[0]);
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    return res.status(500).send();
  }
};

const updateTodoHandler = async (req, res) => {
  try {
    const { params, body } = req;
    const requiredTodoId = params.id;
    const updatedTodo = await todoServices.updateTodo(requiredTodoId, body);
    res.status(200).send(updatedTodo);
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500).send();
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    const { params } = req;
    const requiredTodoId = params.id;
    const message = await todoServices.deleteTodo(requiredTodoId);
    res.status(200).send(message);
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500).send();
  }
};
const deleteAllTodoHandler = async (req, res) => {
  try {
    const message = await todoServices.deleteAllTodo();
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send();
  }
};

const deleteStatusTodoHandler = async (req, res) => {
  try {
    const { query } = req;
    const message = await todoServices.deleteStatusTodo(query.status);
    res.status(200).send(message);
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500).send();
  }
};
module.exports = {
  getAllTodoHandler,
  postTodoHandler,
  getTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  deleteAllTodoHandler,
  deleteStatusTodoHandler,
};
