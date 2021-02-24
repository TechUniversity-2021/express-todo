/* eslint-disable consistent-return */
const { Todo } = require('../models');

const getTodos = async () => {
  const todos = await Todo.findAll();
  return todos;
};

const getTodo = async (id) => {
  const todo = await Todo.findOne({
    where: {
      id,
    },
  });
  return todo;
};

const createTodo = async (content) => {
  const ack = await Todo.create({ title: content.todo, status: content.status });
  return ack;
};

const updateTodo = async (id, content) => {
  const updatedTodo = await Todo.update({ title: content.todo, status: content.status },
    { where: { id }, returning: true });
  return updatedTodo[1];
};

const deleteTodo = async (id) => {
  const isDeleted = await Todo.destroy({ where: { id } });
  if (isDeleted === 0) return [];
  return `Todo with ID ${id} deleted`;
};

module.exports = {
  getTodos, createTodo, updateTodo, getTodo, deleteTodo,
};
