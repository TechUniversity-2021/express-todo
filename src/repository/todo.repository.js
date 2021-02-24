const { Todo } = require('../models');

const getTodos = async () => {
  const todos = await Todo.findAll();
  return todos;
};

const getTodo = async (id) => {
  const todo = await Todo.findAll({
    where: {
      id,
    },
  });
  return todo;
};

const createTodo = async (todo, status) => {
  const newTodo = await Todo.create({ title: todo, status });
  return newTodo;
};

const updateTodo = async (id, todo, status) => {
  const updatedTodo = await Todo.update({ title: todo, status }, { where: { id } });
  if (updatedTodo.toString() === '0') return [];
  return `Updated id ${id}`;
};

const deleteTodo = async (id) => {
  const deletedTodo = await Todo.destroy({ where: { id } });
  if (deletedTodo.toString() === '0') return [];
  return `Deleted id ${id}`;
};

module.exports = {
  getTodos, getTodo, createTodo, updateTodo, deleteTodo,
};
