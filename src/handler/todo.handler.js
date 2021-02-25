const Joi = require('joi');
const todoService = require('../services/todo.service');

const getAllTodo = async (req, res) => {
  const fileData = await todoService.getAllTodo();
  res.status(200).send(fileData);
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  const reqTodo = await todoService.getTodoById(parseInt(id));
  res.status(200).send(reqTodo);
};

const createTodo = async (req, res) => {
  const { title } = req.body;
  const schema = Joi.object().keys({
    title: Joi.string().required(),
  });
  const result = schema.validate({ title });
  if (result.error) res.status(400).send('Invalid Request');
  else {
    const reqTodo = await todoService.addTodo(title, 'Incomplete');
    res.status(201).send(reqTodo);
  }
};

const updateTodo = async (req, res) => {
  const { title, status } = req.body;
  const updated = await todoService.updateTodo(parseInt(req.params.id), title, status);
  if (updated > 0) { res.status(200).send('updated'); } else { res.status(404).send('Invalid ID update'); }
};

const deleteTodo = async (req, res) => {
  const fileData = await todoService.deleteTodo(parseInt(req.params.id));
  if (fileData > 0) { res.status(200).send('successDelete'); } else { res.status(404).send('Invalid ID Delete'); }
};

module.exports = {
  getAllTodo,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
