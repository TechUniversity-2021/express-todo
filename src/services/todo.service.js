/* eslint-disable consistent-return */
const todoRepository = require('../repository/todo.repository');

const getTodos = async () => {
  const todos = await todoRepository.getTodos();
  return todos;
};

const getTodo = async (id) => {
  const todo = await todoRepository.getTodo(id);
  return todo;
};

const createTodo = async (content) => {
  const ack = await todoRepository.createTodo(content.todo, content.status);
  return ack;
};

const updateTodo = async (id, content) => {
  const ack = await todoRepository.updateTodo(id, content.todo, content.status);
  return ack;
};

const deleteTodo = async (id) => {
  const ack = await todoRepository.deleteTodo(id);
  return ack;
};

module.exports = {
  getTodos, createTodo, updateTodo, getTodo, deleteTodo,
};
