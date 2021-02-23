const todoServices = require('../services');
const NonExistentError = require('../errors/nonExistent.errors');

const getAllTodoHandler = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const allTodos = await todoServices.getAllTodo(db);
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(500).send();
  }
};
const postTodoHandler = async (req, res) => {
  try {
    const { body } = req;
    const { db } = req.app.locals;
    const createdTodo = await todoServices.createTodo(body, db);
    res.status(201).send(createdTodo[0]);
  } catch (error) {
    res.status(500).send();
  }
};
const getTodoHandler = async (req, res) => {
  try {
    const { params } = req;
    const requiredTodoId = params.id;
    const { db } = req.app.locals;
    const todo = await todoServices.getTodo(requiredTodoId, db);
    if (todo.length === 0) {
      return res.status(404).send('Todo not found');
    }
    return res.status(200).send(todo[0]);
  } catch (error) {
    return res.status(500).send();
  }
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
    else res.status(500).send();
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
    else res.status(500).send();
  }
};
const deleteAllTodoHandler = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const message = await todoServices.deleteAllTodo(db);
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send();
  }
};

const deleteStatusTodoHandler = async (req, res) => {
  try {
    const { query } = req;
    const { db } = req.app.locals;
    const message = await todoServices.deleteStatusTodo(query.status, db);
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
