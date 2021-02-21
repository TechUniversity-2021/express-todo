const todoServices = require('../services');

const getAllTodoHandler = async (req, res) => {
  try {
    const allTodos = await todoServices.getAllTodo();
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const postTodoHandler = async (req, res) => {
  const { body } = req;
  try {
    const message = await todoServices.postTodo(body);
    res.status(200).send(message);
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
    res.status(error.status).send(error.message);
  }
};

const updateTodoHandler = async (req, res) => {
  try {
    const { params, body } = req;
    const requiredTodoId = params.id;
    await todoServices.updateTodo(requiredTodoId, body);
    res.status(200).send('Success');
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};
module.exports = {
  getAllTodoHandler,
  postTodoHandler,
  getTodoHandler,
  updateTodoHandler,
};
