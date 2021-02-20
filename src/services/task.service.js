const {readData, convertTodo} = require('../utils/task.util')

const getTodosService = async () =>
{
  const todo = await readData('./src/resources/file.txt')
  const todos = convertTodo(todo);

  return todos;
}

module.exports = { getTodosService };
