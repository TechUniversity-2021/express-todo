const express = require('express');
const {
  getAllTodosHandler, getTodoByIDHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler,
} = require('../handlers/todo.handler');
const {
  getTodoValidaton, createTodoValidaton, updateTodoValidaton,
} = require('../validatons/todo.validatons');

const router = express.Router();

router.get('', getAllTodosHandler);
router.get('/:id', getTodoValidaton, getTodoByIDHandler);
router.post('', createTodoValidaton, createTodoHandler);
router.put('/:id', updateTodoValidaton, updateTodoHandler);
router.delete('/:id', deleteTodoHandler);

module.exports = { router };
