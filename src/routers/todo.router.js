const express = require('express');
const handlers = require('../handlers');

const router = express.Router();

// console.log(getAllTodoHandler);
router.get('', handlers.getAllTodoHandler);
router.post('', handlers.postTodoHandler);
router.get('/:id', handlers.getTodoHandler);
router.put('/:id', handlers.updateTodoHandler);
router.delete('/:id', handlers.deleteTodoHandler);

module.exports = {
  router,
};
