const Joi = require('joi');
const todoService = require('../services/todo.service');

const todoHandler = async (req, res) => {
  const { db } = req.app.locals;
  const fileData = await todoService.structureFileContent(db);
  res.status(200).send(fileData);
};

const createTodo = async (req, res) => {
  const { body } = req;
  const schema = Joi.object().keys({
    todo: Joi.string().required(),
  });
  const result = schema.validate(body);
  if (result.error) res.status(400).send('Invalid Request');
  else {
    const { db } = req.app.locals;
    const updatedTodo = await todoService.addTodo(body.todo, db);
    res.status(201).send(updatedTodo);
  }
};

const getTodoById = async (req, res) => {
  const { db } = req.app.locals;
  const reqTodo = await todoService.getTodoById(parseInt(req.params.id), db);
  if (reqTodo) { res.status(200).send(reqTodo); } else { res.status(404).send('NoSuchID'); }// make it 404
};

const updateTodo = async (req, res) => {
  const { db } = req.app.locals;
  console.log(req.body);
  const updated = await todoService.updateTodo(db, parseInt(req.params.id), req.body);
  if (updated >= 0) { res.status(200).send('updated'); } else { res.status(400).send('Error: No todo at id'); }
};

const deleteTodo = async (req, res) => {
  const { db } = req.app.locals;
  const fileData = await todoService.deleteTodo(db, parseInt(req.params.id));
  if (fileData === 0) { res.status(404).send('ERROR: No Such ID'); } else { res.status(200).send('Deleted'); }
};

module.exports = {
  todoHandler,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
