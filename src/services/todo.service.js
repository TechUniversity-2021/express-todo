/* eslint-disable no-param-reassign */
const fileOps = require('../utilities/fsFunctions.utilities');
const repoOperations = require('../repository/todo.repository');
const { TODO_FILE_PATH } = require('../constants/configure');
const NonExistentError = require('../errors/nonExistent.errors');

const getAllTodo = async (db) => {
  const todoList = await repoOperations.getAllTodo(db);
  return todoList;
};

const createTodo = async (todo, db) => {
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

const deleteAllTodo = async () => {
  const message = await fileOps.writeFile(TODO_FILE_PATH, '');
  return message;
};

const deleteStatusTodo = async (status) => {
  const allTodo = await getAllTodo();
  if (allTodo.length === 0) {
    throw new NonExistentError('Todo not found');
  }
  const todoToBeDeleted = allTodo.filter((todo) => todo.status === status);
  const updatedTodoList = allTodo.filter((todo) => todo.status !== status);
  if (todoToBeDeleted.length === 0) {
    throw new NonExistentError('Todo not found');
  }
  await fileOps.writeFile(TODO_FILE_PATH, '');
  const writeAllTodoPromiseArr = updatedTodoList
    .map((todo) => createTodo(todo));
  await Promise.all(writeAllTodoPromiseArr);
  return 'Success';
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
