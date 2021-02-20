<<<<<<< HEAD
const fileOps = require('../utils/task.util')

const getTodosService = async () =>
{
  const todo = await fileOps.readData("./src/resources/file.txt")
  const todos = fileOps.convertTodo(todo);

  return todos;
}

const postTodoService = async (body,id) => {
  let convertedTodo=fileOps.convertTodoByUser(body,id);
  
await  fileOps.writeData('./src/resources/file.txt', convertedTodo);



}

const putTodoService = async (body, givenId) => {
  const todos = await fileOps.readData('./src/resources/file.txt');
  const convertedTodos = fileOps.convertTodo(todos);
  const newTodo = await fileOps.changeData(convertedTodos, body, givenId);
  
  return newTodo;
}

const deleteTodoService = async ( givenId) => {
  const todos = await fileOps.readData('./src/resources/file.txt');
  const convertedTodos = fileOps.convertTodo(todos);
  const newTodo = await fileOps.changeDeleteData(convertedTodos, givenId);
  
}

module.exports = { getTodosService , postTodoService, putTodoService, deleteTodoService};
=======
const {readData, convertTodo} = require('../utils/task.util')

const getTodosService = async () =>
{
  const todo = await readData('./src/resources/file.txt')
  const todos = convertTodo(todo);

  return todos;
}

module.exports = { getTodosService };
>>>>>>> ec137be... feat: add getTodoById function
