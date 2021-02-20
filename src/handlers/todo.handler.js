const service = require('../services/todo.service');

const getAllTodosHandler = async (req, res) => {
  const tasksData = await service.getAllTodos();
  res.status(200).send(tasksData);
};

module.exports = { getAllTodosHandler };
