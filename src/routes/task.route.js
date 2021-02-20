const express = require('express');

const router = express.Router();
const { getTodosHandler , getTodoByIdHandler ,postTodoHandler} = require('../handlers/task.handler');

router.get('', getTodosHandler);
router.get('/:id',getTodoByIdHandler);
router.post('',postTodoHandler)

module.exports = {
  router,
};
