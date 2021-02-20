const express = require('express');
const handlers = require('../handlers');

const router = express.Router();

// console.log(getAllTodoHandler);
router.get('', handlers.getAllTodoHandler);
router.post('', handlers.postTodoHandler);

module.exports = {
  router,
};
