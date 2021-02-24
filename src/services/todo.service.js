/* eslint-disable no-param-reassign */
const NonExistentError = require('../errors/nonExistent.errors');
const { Todo } = require('../models');

const getAllTodo = async () => {
  const todos = await Todo.findAll();
  return todos;
};

const createTodo = async (todo) => {
  const todoCopy = { ...todo };
  if (!todoCopy.status) {
    todoCopy.status = 'incomplete';
  }
  const createdTodo = await Todo.create(
    { description: todoCopy.description, status: todoCopy.status },
  );
  return createdTodo.dataValues;
};

const getTodo = async (reqId) => {
  const todo = await Todo.findAll({
    where: {
      id: reqId,
    },
  });
  if (todo.length === 0) throw new NonExistentError('Todo not found');
  return todo;
};

const updateTodo = async (reqId, updateData) => {
  const updatedTodo = await Todo.update(
    { status: updateData.status, description: updateData.description }, {
      where: {
        id: reqId,
      },
      returning: true,
    },
  );
  if (updatedTodo[0] === 0) {
    throw new NonExistentError('Todo not found');
  }
  return updatedTodo[1][0].dataValues;
};

const deleteTodo = async (reqId) => {
  const countOfDeletedTodos = await Todo.destroy({
    where: {
      id: reqId,
    },
  });
  if (countOfDeletedTodos === 0) throw new NonExistentError('Todo not found');
  return `${countOfDeletedTodos} todo(s) deleted`;
};

const deleteAllTodo = async () => {
  await Todo.destroy({
    truncate: true,
  });
  return 'All todos deleted';
};

const deleteStatusTodo = async (reqStatus) => {
  const countOfDeletedTodos = await Todo.destroy({
    where: {
      status: reqStatus,
    },
  });
  if (countOfDeletedTodos === 0) throw new NonExistentError('Todo not found');
  return `${countOfDeletedTodos} todo(s) deleted`;
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
