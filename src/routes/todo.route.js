const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  getTodoById,
  getTodoByQuery,
  deleteTodoById,
  deleteTodos,
  deleteTodoByStatus,
} = require('../handlers/todo.handler');

// const { todoValidator } = require('../validation/todo.validation');

const todoRouter = express.Router();

todoRouter.get('/', getTodos);
todoRouter.get('/:id', getTodoById);
todoRouter.get('/', getTodoByQuery);
// todoRouter.post('/', todoValidator, createTodo);
todoRouter.post('/', createTodo);
todoRouter.put('/:id', updateTodo);
todoRouter.delete('/:id', deleteTodoById);
// todoRouter.delete('/:status', deleteTodoByStatus);
todoRouter.delete('/', deleteTodos);

module.exports = {
  todoRouter,
};
