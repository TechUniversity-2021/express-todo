const { Todo } = require('../models');

const getAllTodo = async () => {
  const result = await Todo.findAll();
  return result;
};
const getTodoById = async (reqId) => {
  const result = await Todo.findAll({ where: { id: reqId } });
  return result;
};
const addTodo = async (todo, reqStatus) => {
  const result = await Todo.create({ title: todo, status: reqStatus });
  return result;
};
const updateTodo = async (reqId, todo, reqStatus) => {
  const result = await Todo.update({ title: todo, status: reqStatus }, { where: { id: reqId } });
  return result;
};
const deleteTodo = async (reqId) => {
  const result = await Todo.destroy({ where: { id: reqId } });
  return result;
};

module.exports = {
  getAllTodo,
  addTodo,
  updateTodo,
  getTodoById,
  deleteTodo,
};
