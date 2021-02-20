const express = require('express');
const { todoGetHandler, todoPostHandler, todoPutHandler } = require('../handlers/todo.handler');

const router = express.Router();
router.get('', todoGetHandler);
router.post('', todoPostHandler);
router.put('/id', todoPutHandler);
module.exports = { router };
