/* eslint-disable consistent-return */
const { v4: uuid } = require('uuid');
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

const createTodo = async (content) => {
  const newTodo = `\n${uuid()}|${content.todo}|Active`;
  const ack = await fileUtils.appendFile('resources/todos.txt', newTodo);
  return ack;
};

const updateTodo = async (id, content) => {
  const text = await fileUtils.getFileData('resources/todos.txt');
  const todosLines = text.split('\n');
  let result;
  let flag = 0;
  todosLines.forEach((line) => {
    if (line.startsWith(id)) {
      flag = 1;
      result = text.replace(line, `${id}|${content.todo}|${content.status}`);
      fileUtils.updateFile('resources/todos.txt', result);
    }
  });
  if (flag === 1) return 'Updated';
  return 'Todo with given id not found';
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
