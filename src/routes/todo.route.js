const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  getTodoById,
  getTodoByQuery,
  deleteTodoById,
  deleteTodos,
  // deleteTodoByStatus,
} = require('../handlers/todo.handler');

const todoRouter = express.Router();

todoRouter.get('/', getTodos); // localhost:8080/todo/
todoRouter.get('/:id', getTodoById);
todoRouter.get('', getTodoByQuery); // localhost:8080/todo?
todoRouter.post('/', createTodo);
todoRouter.put('/:id', updateTodo);
todoRouter.delete('/:id', deleteTodoById);
// todoRouter.delete('/:status', deleteTodoByStatus);
todoRouter.delete('/', deleteTodos);

// quoteRouter.get(`/?value=${num}`,getArrayOfQuotes);

module.exports = {
  todoRouter,
};
