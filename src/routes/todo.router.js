const express = require('express');
const {
  getAllTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler,
} = require('../handlers/todo.handler');

const router = express.Router();

router.get('', getAllTodosHandler);
router.post('', createTodoHandler);
router.put('', updateTodoHandler);
router.delete('', deleteTodoHandler);

module.exports = { router };
