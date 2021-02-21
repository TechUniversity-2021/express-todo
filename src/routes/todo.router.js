const express = require('express');
const { getAllTodosHandler, createTodoHandler } = require('../handlers/todo.handler');

const router = express.Router();

router.get('', getAllTodosHandler);
router.post('', createTodoHandler);

module.exports = { router };
