const express = require('express');
const {
  getAllTodosHandler, getTodoByIDHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler,
} = require('../handlers/todo.handler');
const {
  getTodoValidaton,
} = require('../validatons/todo.validatons');

const router = express.Router();

router.get('', getAllTodosHandler);
router.get('/:id', getTodoValidaton, getTodoByIDHandler);
router.post('', createTodoHandler);
router.put('/:id', updateTodoHandler);
router.delete('/:id', deleteTodoHandler);

module.exports = { router };
