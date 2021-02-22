const express = require('express');
const todoHandler = require('../handlers/todo.handler');

const todoRouter = express.Router();

todoRouter.get('/', todoHandler.getTodos);
todoRouter.post('/', todoHandler.createTodo);
todoRouter.put('/:id', todoHandler.updateTodo);
module.exports = {
  todoRouter,
};
