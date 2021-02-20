const express = require('express');
const validator = require('../validations/index')
const {postTodoSchema} =require('../validations/task.schema')

const router = express.Router();
<<<<<<< HEAD
const { getTodosHandler , getTodoByIdHandler ,postTodoHandler, putTodoHandler, deleteTodoHandler} = require('../handlers/task.handler');
=======
const { getTodosHandler , getTodoByIdHandler ,postTodoHandler} = require('../handlers/task.handler');
>>>>>>> ec137be... feat: add getTodoById function

router.get('', getTodosHandler);
router.get('/:id',getTodoByIdHandler);
router.post('',postTodoHandler)
<<<<<<< HEAD
router.put('/:id',putTodoHandler )
router.delete('/:id',deleteTodoHandler )
=======
>>>>>>> ec137be... feat: add getTodoById function

module.exports = {
  router,
};
