const express = require('express');
const {
  todoGetHandler, todoPostHandler, todoPutHandler, todoGetByIdHandler,
} = require('../handlers/todo.handler');

const router = express.Router();
router.get('', todoGetHandler);
router.get('/id', todoGetByIdHandler);
router.post('', todoPostHandler);
router.put('/id', todoPutHandler);

module.exports = { router };
