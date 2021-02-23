/* eslint-disable no-param-reassign */
const repoOperations = require('../repository/todo.repository');
const NonExistentError = require('../errors/nonExistent.errors');

const getAllTodo = async (db) => {
  const todoList = await repoOperations.getAllTodo(db);
  return todoList;
};

const createTodo = async (todo, db) => {
  if (!todo.status) {
    todo.status = 'incomplete';
  }
  const createdTodo = await repoOperations.createTodo(todo, db);
  return createdTodo;
};

const getTodo = async (id, db) => {
  const todo = await repoOperations.getTodo(id, db);
  return todo;
};

const updateTodo = async (id, updateData, db) => {
  const todo = await repoOperations.updateTodo(id, updateData, db);
  if (todo === 'Todo not found') throw new NonExistentError('Todo not found');
  return todo;
};

const deleteTodo = async (id, db) => {
  const message = await repoOperations.deleteTodo(id, db);
  if (message !== 'Success') throw new NonExistentError('Todo not found');
  return message;
};

const deleteAllTodo = async (db) => {
  const message = await repoOperations.deleteAllTodo(db);
  return message;
};

const deleteStatusTodo = async (status, db) => {
  const message = await repoOperations.deleteStatusTodo(status, db);
  if (message !== 'Success') throw new NonExistentError('Todo not found');
  return message;
};

module.exports = {
  getAllTodo,
  createTodo,
  getTodo,
  deleteAllTodo,
  updateTodo,
  deleteTodo,
  deleteStatusTodo,
};
