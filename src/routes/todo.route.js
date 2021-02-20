const express = require('express');
const { todoGetHandler, todoPostHandler } = require('../handlers/todo.handler');

const router = express.Router();
router.get('', todoGetHandler);
router.post('', todoPostHandler);
module.exports = { router };
