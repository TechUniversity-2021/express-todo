const express = require('express');
const todoHandler = require('../handlers/todo.handler');

const todoRouter = express.Router();

todoRouter.get('/', todoHandler.getTodos);
todoRouter.get('/:id', todoHandler.getTodo);
todoRouter.post('/', todoHandler.createTodo);
todoRouter.put('/:id', todoHandler.updateTodo);
todoRouter.delete('/:id', todoHandler.deleteTodo);

module.exports = {
  todoRouter,
};
