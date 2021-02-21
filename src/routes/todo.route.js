const express = require('express');
const getTodo = require('../handlers/index');

const todoRouter = express.Router();

todoRouter.get('/', getTodo.getTodos);
todoRouter.post('/', getTodo.createTodo);
todoRouter.put('/:id', getTodo.updateTodo);

module.exports = {
  todoRouter,
};
