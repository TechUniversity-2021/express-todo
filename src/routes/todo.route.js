const express = require('express');
const todoHandler = require('../handlers/index');

const todoRouter = express.Router();

todoRouter.get('/', todoHandler.getTodos);
todoRouter.post('/', todoHandler.createTodo);
todoRouter.put('/:id', todoHandler.updateTodo);
todoRouter.delete('/:id', todoHandler.deleteTodo);

module.exports = {
  todoRouter,
};
