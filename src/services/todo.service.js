/* eslint-disable prefer-destructuring */
// const uuid = require('uuid');
const fileUtils = require('../utils/fileUtils');
const todoRepository = require('../repository/todo.repository');

const getTodo = async (db) => {
  const todos = await todoRepository.getTodos(db);
  return todos;
};

const getTodoWithQuery = async (db, query) => {
  const todoOfQuery = await todoRepository.getTodoByQuery(db, query);
  return todoOfQuery;
};

// const getTodo = async () => {
// const fileData = await fileUtils.readAfile('./resources/todos.txt');
// const entry = fileData.split('\n');
// return entry.map((item) => {
//   const todoData = item.split('|');
//   return {
//     id: todoData[0],
//     todo: todoData[1],
//     status: todoData[2],
//   };
// });
// };

// const getTodoWithId = async (id) => {
//   const getdata = await getTodo();
//   return getdata.filter((item) => item.id === id);
// };

const getTodoWithId = async (db, id) => {
  const todoOfId = await todoRepository.getTodoByID(db, id);
  return todoOfId;
};

// const getTodoWithQuery = async (todo) => {
//   const getdata = await getTodo();
//   return getdata.filter((item) => item.todo === todo);
// };

// const postTodo = async (data) => {
//   const title = data.todo;
//   const status = data.status || 'Active';
//   const id = uuid.v4();
//   const entry = `${id}|${title}|${status}`;
//   const response = await fileUtils.appendToAfile('./resources/todos.txt', entry);
//   return response;
// };

const postTodo = async (db, data) => {
  const title = data.todo;
  const status = data.status || 'Active';
  const response = await todoRepository.createTodo(db, title, status);
  return response;
};

// const updateTodo = async (id, data) => {
//   const fileData = await fileUtils.readAfile('./resources/todos.txt');
//   const title = data.todo || '';
//   const status = data.status;
//   const todoUpdate = fileData
//     .split('\n')
//     .map((item) => {
//       const todo = item.split('|');
//       if (id === todo[0]) {
//         todo[1] = title || todo[1];
//         todo[2] = status;
//       }
//       return todo.join('|');
//     })
//     .join('\n');
//   await fileUtils.writeToAfile('./resources/todos.txt', todoUpdate);
// };

const updateTodo = async (db, id, data) => { // data is req.body
  const title = data.todo || '';
  const status = data.status;
  const response = await todoRepository.updateTodo(db, id, title, status);
  return response;
};

// const deleteTodoWithId = async (id) => {
//   const data = await fileUtils.readAfile('./resources/todos.txt');
//   const removeTodo = data
//     .split('\n')
//     .filter((item) => {
//       const todo = item.split('|');
//       return id !== todo[0];
//     })
//     .join('\n');
//   await fileUtils.writeToAfile('./resources/todos.txt', removeTodo);
// };

const deleteTodoWithId = async (db, id) => {
  const response = await todoRepository.deleteTodo(db, id);
  return response;
};

// const deleteTodoWithStatus = async (status) => {
//   const data = await fileUtils.readAfile('./resources/todos.txt');
//   const removeTodo = data
//     .split('\n')
//     .filter((item) => {
//       const todo = item.split('|');
//       return status !== todo[2];
//     })
//     .join('\n');
//   await fileUtils.writeToAfile('./resources/todos.txt', removeTodo);
// };

const deleteAllTodos = async () => {
  await fileUtils.writeToAfile('./resources/todos.txt', '');
};

module.exports = {
  getTodo,
  postTodo,
  updateTodo,
  getTodoWithId,
  getTodoWithQuery,
  deleteTodoWithId,
  // deleteTodoWithStatus,
  deleteAllTodos,
};
