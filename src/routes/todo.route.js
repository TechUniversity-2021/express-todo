const express = require('express');

const { todoHandler } = require('../handlers/todo.handler');

const router = express.Router();

router.get('', todoHandler); // /health

module.exports = {
  router,
};