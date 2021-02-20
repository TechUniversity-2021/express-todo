const express = require('express');
const { getAllTodosHandler } = require('../handlers/todo.handler');

const router = express.Router();

router.get('', getAllTodosHandler);

module.exports = { router };
