const service = require('../services/todo.service');

const getAllTodosHandler = async (req, res) => {
  const tasksData = await service.getAllTodos();
  res.status(200).send(tasksData);
};

const createTodoHandler = async (req, res) => {
  const { body } = req;
  const response = await service.createTodo(body.title, body.status);
  res.status(response.status).send(response.message);
  res.status(200).send();
};

module.exports = { getAllTodosHandler, createTodoHandler };
