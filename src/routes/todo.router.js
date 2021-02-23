const express = require('express');
const {
  getAllTodo, createTodo, getTodoById, updateTodo, deleteTodo,
} = require('../handler');

const router = express.Router();

router.get('', getAllTodo);// checked
router.get('/:id', getTodoById);// checked
router.post('', createTodo);// checked
router.put('/:id', updateTodo);// checked
router.delete('/:id', deleteTodo);//

module.exports = {
  router,
};
