const express = require('express');

const {
  getToDoHandler, createToDoHandler, getByIdToDoHandler, updateToDoHandler, deleteByIdToDoHandler,
} = require('../handlers/todo.handler');
// const{ deleteByIdToDoHandler}= require('../handlers/todo.handler');

const router = express.Router();

router.get('', getToDoHandler);
router.post('', createToDoHandler);
router.get('/:id', getByIdToDoHandler);
router.put('/:id', updateToDoHandler);
router.delete('/:id', deleteByIdToDoHandler);
// router.delete('/:status', deleteByStatusToDoHandler);

module.exports = {
  router,
};
