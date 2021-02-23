const express = require('express');
const handlers = require('../handlers');
const {
  postValidator, updateValidator, getValidator: paramsValidator, deleteValidator,
} = require('../validation/todo.validation/todo.validator');

const router = express.Router();

// console.log(getAllTodoHandler);
router.get('', handlers.getAllTodoHandler);
router.post('', postValidator, handlers.postTodoHandler);
router.get('/:id', paramsValidator, handlers.getTodoHandler);
router.put('/:id', paramsValidator, updateValidator, handlers.updateTodoHandler);
router.delete('/:id', paramsValidator, handlers.deleteTodoHandler);
router.delete('/all', handlers.deleteAllTodoHandler);
router.delete('/', deleteValidator, handlers.deleteStatusTodoHandler);
module.exports = {
  router,
};
