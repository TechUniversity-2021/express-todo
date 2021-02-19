const todoService = require('../services/todo.service');

const todoHandler = async (req, res) => {
  const fileData = await todoService.getFileContent();
  res.status(200).send(result);
};

module.exports = {
  todoHandler,
};
