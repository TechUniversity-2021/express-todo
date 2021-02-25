const { Todo } = require('../models');

const getTodos = async () => {
  const result = await Todo.findAll();
  return result;
};
const getTodoById = async (id) => {
  const result = await Todo.findAll({ where: { id } });
  return result;
};
const createTodo = async (todo, status) => {
  const result = await Todo.create({ title: todo, status });
  return result;
};
const updateTodo = async (id, todo, status) => {
  const result = await Todo.update({ title: todo, status }, { where: { id } });
  return result;
};
const deleteTodo = async (id) => {
  const result = await Todo.destroy({ where: { id } });
  return result;
};
module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
};
