const todoServices = require('../services/todo.service');

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

module.exports = {
  getAllTodoHandler,
  postTodoHandler,
};
