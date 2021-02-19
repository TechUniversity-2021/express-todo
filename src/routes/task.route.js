const express = require('express');

const router = express.Router();
const { taskHandler } = require('../handlers/task.handler');

router.get('', taskHandler);

module.exports = {
  router,
};
