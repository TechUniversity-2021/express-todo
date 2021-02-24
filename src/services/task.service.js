const { Todo } = require('../models');
const todoRepository = require('../repository/todo.repository');

const getTodosService = async () => {
  const todos = await Todo.findAll();

  return todos;
};
const getTodoByIdService = async (givenId) => {
  const todos = await Todo.findAll({
    where: {
      id: givenId,
    },
  });
  return todos;
};

const postTodoService = async (body) => {
  const todos = await Todo.create({ title: body.title, status: body.status });
  return todos;
};

const putTodoService = async (body, givenId) => {
  const todo = await Todo.update({ title: body.title, status: body.status }, {
    where: {
      id: givenId,
    },
    returning: true,
  });
  return todo;
};

const deleteTodoService = async (givenId) => {
  const todo = await Todo.destroy({ where: { id: givenId }});
  return todo;
};

module.exports = {
  getTodosService, getTodoByIdService, postTodoService, putTodoService, deleteTodoService,
};
