const todoServices = require('../services/todo.services');

const todoGetHandler = async (req, res) => {
  const todoList = await todoServices.getTodos();
  res.status(200).send(todoList);
};

const todoPostHandler = async (req, res) => {
  const { body } = req;
  const todoPost = `\n${body.id}|${body.todo}|${body.status}`;
  await todoServices.postTodos(todoPost);
  res.status(200).send('Successfully posted!');
};

module.exports = { todoGetHandler, todoPostHandler };
