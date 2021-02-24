const { Todo } = require('../models'); // todos should be same as modelName in model->todos.js

const getTodo = async () => {
  const todos = await Todo.findAll();
  return todos;
};

const getTodoWithId = async (ID) => {
  const todoOfId = await Todo.findAll({
    where: {
      id: ID,
    },
  });
  return todoOfId;
};

const postTodo = async (data) => {
  const message = data.todo;
  const stat = data.status || 'Active';
  const createdTodo = await Todo.create({ title: message, status: stat });
  return createdTodo;
};

const updateTodo = async (ID, data) => { // data is req.body
  const message = data.todo || '';
  const stat = data.status;
  const updatedTodo = await Todo.update({ title: message, status: stat },
    {
      where: {
        id: ID,
      },
      returning: true,
    });
  return updatedTodo[1];
};

const deleteTodoWithId = async (ID) => {
  const response = await Todo.destroy({
    where: {
      id: ID,
    },
  });
  return response;
};

const deleteAllTodos = async () => {
  const todos = await Todo.destroy({
    truncate: true,
  });
  return todos;
};

module.exports = {
  getTodo,
  postTodo,
  updateTodo,
  getTodoWithId,
  deleteTodoWithId,
  deleteAllTodos,
};
