const express = require('express');
const todoHandler = require('../handlers/todo.handlers');

const todoRouter = express.Router();

todoRouter.get('/', todoHandler.getTodosHandler);
todoRouter.post('/', todoHandler.createTodo);
todoRouter.put('/:id', todoHandler.updateTodoHandler);
todoRouter.get('/:id', todoHandler.getTodosHandlerById);
todoRouter.delete('/:id', todoHandler.deleteByIdToDoHandler);
module.exports = {
  todoRouter,
};
