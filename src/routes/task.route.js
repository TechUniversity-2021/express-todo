const express = require('express');
const validator = require('../validations/index');
const { postTodoSchema } = require('../validations/task.schema');

const router = express.Router();
const {
  getTodosHandler, getTodoByIdHandler, postTodoHandler, putTodoHandler, deleteTodoHandler,
} = require('../handlers/task.handler');

router.get('', getTodosHandler);
router.get('/:id', getTodoByIdHandler);
router.post('', postTodoHandler);
router.put('/:id', putTodoHandler);
router.delete('/:id', deleteTodoHandler);

module.exports = {
  router,
};
