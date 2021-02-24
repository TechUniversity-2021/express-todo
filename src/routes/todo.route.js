const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  getTodoById,
  deleteTodoById,
  deleteTodos,
} = require('../handlers/todo.handler');

const todoRouter = express.Router();

todoRouter.get('/', getTodos); // localhost:8080/todo/
todoRouter.get('/:id', getTodoById);
todoRouter.post('/', createTodo);
todoRouter.put('/:id', updateTodo);
todoRouter.delete('/:id', deleteTodoById);
todoRouter.delete('/', deleteTodos);

module.exports = {
  todoRouter,
};
