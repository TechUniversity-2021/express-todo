const fileOps = require('../utils/task.util')
const todoRepository = require('../repository/todo.repository')

const getTodosService = async (db) =>
{
  const todos = await todoRepository.getTodos(db);

  return todos;

}
const getTodoByIdService = async (db, id) =>
{
const todos= await todoRepository.getTodoById(db, id);
return todos;

}

const postTodoService = async (body,db) => {
await todoRepository.postTodo(body,db);
//  return todo; 
}

const putTodoService = async (body, givenId, db) => {
 
   await todoRepository.updateTodo( body, givenId, db);
 
}

const deleteTodoService = async ( givenId, db) => {
 
  await todoRepository.deleteTodo(givenId, db);
  
}

module.exports = { getTodosService ,getTodoByIdService, postTodoService,putTodoService, deleteTodoService};
