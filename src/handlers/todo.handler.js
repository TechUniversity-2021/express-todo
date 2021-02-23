const todoServices = require('../services');
const NonExistentError = require('../errors/nonExistent.errors');

const getAllTodoHandler = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const allTodos = await todoServices.getAllTodo(db);
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(500);
  }
};
const postTodoHandler = async (req, res) => {
  const { body } = req;
  const { db } = req.app.locals;
  const createdTodo = await todoServices.createTodo(body, db);
  res.status(201).send(createdTodo[0]);
};
const getTodoHandler = async (req, res) => {
  const { params } = req;
  const requiredTodoId = params.id;
  const { db } = req.app.locals;
  const todo = await todoServices.getTodo(requiredTodoId, db);
  if (todo.length === 0) {
    return res.status(404).send('Todo not found');
  }
  return res.status(200).send(todo[0]);
};

const updateTodoHandler = async (req, res) => {
  try {
    const { params, body } = req;
    const { db } = req.app.locals;
    const requiredTodoId = params.id;
    const updateTodo = await todoServices.updateTodo(requiredTodoId, body, db);
    res.status(200).send(updateTodo[0]);
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500);
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    const { params } = req;
    const { db } = req.app.locals;
    const requiredTodoId = params.id;
    await todoServices.deleteTodo(requiredTodoId, db);
    res.status(200).send('Success');
  } catch (error) {
    if (error instanceof NonExistentError) res.status(404).send(error.message);
    else res.status(500);
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
