/* eslint-disable prefer-destructuring */
const uuid = require('uuid');
const fileUtils = require('../utils/fileUtils');

// is it ok to pass request as argument in services function?
const getTodo = async (req) => {
  const fileData = await fileUtils.readAfile('./resources/todos.txt');
  const entry = fileData.split('\n');
  if (Object.keys(req.query).length === 0) {
    return entry.map((item) => {
      const todoData = item.split('|');
      return {
        id: todoData[0],
        todo: todoData[1],
        status: todoData[2],
      };
    });
  }
  return entry.map((item) => {
    const todoData = item.split('|');
    return {
      id: todoData[0],
      todo: todoData[1],
      status: todoData[2],
    };
  }).filter((item) => item.todo === req.query.search);
};

const getTodoWithId = async (req) => {
  const getdata = await getTodo(req);
  return getdata.filter((item) => item.id === req.params.id);
};

// const getTodoWithQuery = async (todo) => {
//   const getdata = await getTodo();
//   return getdata.filter((item) => item.todo === todo);
// };

const postTodo = async (data) => {
  const title = data.todo;
  const status = data.status || 'Active';
  const id = uuid.v4();
  const entry = `${id}|${title}|${status}`;
  const response = await fileUtils.appendToAfile('./resources/todos.txt', entry);
  return response;
};

const updateTodo = async (id, data) => {
  const fileData = await fileUtils.readAfile('./resources/todos.txt');
  const title = data.todo || '';
  const status = data.status;
  const todoUpdate = fileData
    .split('\n')
    .map((item) => {
      const todo = item.split('|');
      if (id === todo[0]) {
        todo[1] = title || todo[1];
        todo[2] = status;
      }
      return todo.join('|');
    })
    .join('\n');
  await fileUtils.writeToAfile('./resources/todos.txt', todoUpdate);
};

const deleteTodoWithId = async (id) => {
  const data = await fileUtils.readAfile('./resources/todos.txt');
  const removeTodo = data
    .split('\n')
    .filter((item) => {
      const todo = item.split('|');
      return id !== todo[0];
    })
    .join('\n');
  await fileUtils.writeToAfile('./resources/todos.txt', removeTodo);
};

const deleteTodoWithStatus = async (status) => {
  const data = await fileUtils.readAfile('./resources/todos.txt');
  const removeTodo = data
    .split('\n')
    .filter((item) => {
      const todo = item.split('|');
      return status !== todo[2];
    })
    .join('\n');
  await fileUtils.writeToAfile('./resources/todos.txt', removeTodo);
};

const deleteAllTodos = async () => {
  await fileUtils.writeToAfile('./resources/todos.txt', '');
};
module.exports = {
  getTodo,
  postTodo,
  updateTodo,
  getTodoWithId,
  // getTodoWithQuery,
  deleteTodoWithId,
  deleteTodoWithStatus,
  deleteAllTodos,
};
