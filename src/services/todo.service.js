/* eslint-disable consistent-return */
const fileUtils = require('../utils/file.utils');
const todoRepository = require('../repository/todo.repository');

const getTodos = async (db) => {
  const todos = await todoRepository.getTodos(db);
  return todos;
};

const getTodo = async (db, id) => {
  const todo = await todoRepository.getTodo(db, id);
  return todo;
};

const createTodo = async (db, content) => {
  const ack = await todoRepository.createTodo(db, content.todo, content.status);
  return ack;
};

const updateTodo = async (db, id, content) => {
  const ack = await todoRepository.updateTodo(db, id, content.todo, content.status);
  return ack;
};

const deleteTodo = async (id) => {
  const text = await fileUtils.getFileData('resources/todos.txt');
  const todosLines = text.split('\n');
  let result;
  let flag = 0;
  todosLines.forEach((line) => {
    if (line.startsWith(id)) {
      flag = 1;
      result = text.replace(line, '');
      fileUtils.updateFile('resources/todos.txt', result);
    }
  });
  if (flag === 1) return 'Deleted';
  return 'Todo with given id not found';
};

module.exports = {
  getTodos, createTodo, updateTodo, getTodo, deleteTodo,
};
