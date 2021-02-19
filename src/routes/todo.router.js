const express = require('express');

const router = express.Router();
const { todoHandler } = require('../handler/todo.handler');

router.get('', todoHandler);

module.exports = {
  router,
};
