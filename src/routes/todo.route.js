const express = require('express');
const todoHandler = require('../handlers/todo.handler');

const todoRouter = express.Router();

todoRouter.get('/', todoHandler.getTodos);

module.exports = {
  todoRouter,
};
