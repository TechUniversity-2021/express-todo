const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  getTodoById,
  // getTodoByQuery,
  deleteTodoById,
  deleteTodos,
  // deleteTodoByStatus,
} = require('../handlers/todo.handler');

const { postTodoValidator, updateTodoValidator } = require('../validation/todo.validator');

const todoRouter = express.Router();

todoRouter.get('/', getTodos);
todoRouter.get('/:id', getTodoById);
// todoRouter.get('/', getTodoByQuery);
todoRouter.post('/', postTodoValidator, createTodo);
todoRouter.put('/:id', updateTodoValidator, updateTodo);
todoRouter.delete('/:id', deleteTodoById);
// todoRouter.delete('/:status', deleteTodoByStatus);
todoRouter.delete('/', deleteTodos);

module.exports = {
  todoRouter,
};
