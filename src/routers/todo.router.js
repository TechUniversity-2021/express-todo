const express = require('express');

const router = express.router();
const { getAllTodoHandler } = require('../handlers');

router.get('', getAllTodoHandler);

module.exports = {
  router,
};
