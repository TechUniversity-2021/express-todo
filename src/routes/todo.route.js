const express = require('express');
const { todoHandler } = require('../handlers/todo.handler');

const router = express.Router();

router.get('', todoHandler);

module.exports = { router };
