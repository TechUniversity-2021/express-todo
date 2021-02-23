/* eslint-disable consistent-return */
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

const deleteTodo = async (db, id) => {
  const ack = await todoRepository.deleteTodo(db, id);
  return ack;
};

module.exports = {
  getTodos, createTodo, updateTodo, getTodo, deleteTodo,
};
