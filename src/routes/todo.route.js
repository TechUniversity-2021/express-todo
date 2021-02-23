const express = require('express');

const {
  getToDoHandler, postToDoHandler, getByIdToDoHandler, putToDoHandler, deleteByIdToDoHandler,
} = require('../handlers/todo.handler');
// const{ deleteByIdToDoHandler}= require('../handlers/todo.handler');

const router = express.Router();

router.get('', getToDoHandler);
router.post('', postToDoHandler);
router.get('/:id', getByIdToDoHandler);
router.put('/:id', putToDoHandler);
router.delete('/:id', deleteByIdToDoHandler);
// router.delete('/:status', deleteByStatusToDoHandler);

module.exports = {
  router,
};
