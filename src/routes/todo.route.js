const express = require('express');
const {
  todoGetHandler, todoPostHandler, todoPutHandler, todoGetByIdHandler, todoDeleteByIdHandler,
} = require('../handlers/todo.handler');

const router = express.Router();
router.get('', todoGetHandler);
router.get('/:id', todoGetByIdHandler);
router.post('', todoPostHandler);
router.put('/:id', todoPutHandler);
router.delete('/:id', todoDeleteByIdHandler);

module.exports = { router };
