const express = require('express');
const { getTodos } = require('../handlers/index');

const todoRouter = express.Router();

todoRouter.get('/', getTodos);

module.exports = {
  todoRouter,
};
