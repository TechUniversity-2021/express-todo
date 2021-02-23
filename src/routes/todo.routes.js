const express = require('express');
const todoHandler = require('../handlers/todo.handlers');

const todoRouter = express.Router();

todoRouter.get('/', todoHandler.getTodosHandler);
todoRouter.post('/', todoHandler.createTodoHandler);
todoRouter.put('/:id', todoHandler.updateTodoHandler);
todoRouter.get('/:id', todoHandler.getTodosHandlerById);
todoRouter.delete('/:id', todoHandler.deleteByIdToDoHandler);
todoRouter.delete('/', todoHandler.deleteAllToDoHandler);
todoRouter.delete('/:status', todoHandler.deleteByStatusToDoHandler);
module.exports = {
  todoRouter,
};
