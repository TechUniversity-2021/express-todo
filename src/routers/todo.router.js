const express = require('express');
const handlers = require('../handlers');
const { postValidator, updateValidator } = require('../validation/todo.validation/todo.validator');

const router = express.Router();

// console.log(getAllTodoHandler);
router.get('', handlers.getAllTodoHandler);
router.post('', postValidator, handlers.postTodoHandler);
router.get('/:id', handlers.getTodoHandler);
router.put('/:id', updateValidator, handlers.updateTodoHandler);
router.delete('/:id', handlers.deleteTodoHandler);
router.delete('/all', handlers.deleteAllTodoHandler);
router.delete('/', handlers.deleteStatusTodoHandler);
module.exports = {
  router,
};
