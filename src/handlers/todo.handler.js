const { getAllTodo } = require('../services/todo.service');

const getAllTodoHandler = async (req, res) => {
  const allTodos = await getAllTodo();
  res.status(200).send(allTodos);
};

module.exports = {
  getAllTodoHandler,
};
