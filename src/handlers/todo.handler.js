const todoServices = require('../services');
const NonExistentError = require('../errors/nonExistent.errors');

const getAllTodoHandler = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const allTodos = await todoServices.getAllTodo(db);
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const postTodoHandler = async (req, res) => {
  const { body } = req;
  try {
    const message = await todoServices.createTodo(body);
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getTodoHandler = async (req, res) => {
  try {
    const { params } = req;
    const requiredTodoId = params.id;
    const todo = await todoServices.getTodo(requiredTodoId);
    res.status(200).send(todo);
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500).send(error.message);
  }
};

const updateTodoHandler = async (req, res) => {
  try {
    const { params, body } = req;
    const requiredTodoId = params.id;
    const updateTodo = await todoServices.updateTodo(requiredTodoId, body);
    res.status(200).send(updateTodo);
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500).send(error.message);
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    const { params } = req;
    const requiredTodoId = params.id;
    await todoServices.deleteTodo(requiredTodoId);
    res.status(200).send('Success');
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500).send(error.message);
  }
};
const deleteAllTodoHandler = async (req, res) => {
  try {
    const message = await todoServices.deleteAllTodo();
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteStatusTodoHandler = async (req, res) => {
  try {
    const { query } = req;
    const message = await todoServices.deleteStatusTodo(query.status);
    res.status(200).send(message);
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500).send(error.message);
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
