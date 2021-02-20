const fileUtil = require('../utils/fileUtil');
const todosService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const todoFileData = await fileUtil.readFile('./resources/todos.txt');
  const parsedTodoData = todosService.getParsedTodos(todoFileData);
  res.status(200).send(parsedTodoData);
};

module.exports = {
  getTodos,
};
