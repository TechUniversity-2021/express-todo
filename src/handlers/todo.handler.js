const todoServices = require('../services/todo.service');

const getAllTodoHandler = async (req, res) => {
  try {
    const allTodos = await todoServices.getAllTodo();
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllTodoHandler,
};
