const fileRead = require('../utilities/promisifyReadFile');
const fileAppend = require('../utilities/promisifyAppendFile');
const fileWrite = require('../utilities/promisifyWriteFile');
const constFilePath = require('../constants/filePath');
const repositoryTodo = require('../repository/todo.repository');

const getTodos = async (db) => {
  const todos = await repositoryTodo.getTodos(db);
  // const fileContent = await fileRead.promisifyFs(constFilePath.filePath());
  // const todos = fileContent.toString().split('\n');
  // const todoObjects = todos.map((todo) => {
  //   const tempTodoObj = todo.split('|');
  //   return {
  //     id: tempTodoObj[0],
  //     todo: tempTodoObj[1],
  //     status: tempTodoObj[2],
  //   };
  // });
  return todos;
};
const getTodoById = async (db, id) => {
  const todos = await repositoryTodo.getTodosById(db, id);
  return todos;
};

const postTodos = async (db, todoPost) => {
  const returnedMessage = await repositoryTodo.postTodo(db, todoPost);
  return returnedMessage;
  // await fileAppend.promisifyAppendFs(constFilePath.filePath(), todoPost);
};

const putTodos = async (db, updateId, updatedTodo) => {
  const returnedMessage = await repositoryTodo.putTodo(db, updateId, updatedTodo);
  return returnedMessage;
  // await fileWrite.promisifyWriteFs(constFilePath.filePath(), updateTodoPut);
};

const deleteTodo = async (db, deleteId) => {
  const returnedMessage = await repositoryTodo.deleteTodo(db, deleteId);
  return returnedMessage;
};
module.exports = {
  getTodos, postTodos, putTodos, getTodoById, deleteTodo,
};
