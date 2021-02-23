const Joi = require('joi');
const todoService = require('../services/task.service');

const getTodosHandler = async (req, res) => {
  const { db } = req.app.locals;
  // const todoList = await getTodosService();
  const todos = await todoService.getTodosService(db);
  res.status(200).send(todos);
};

const getTodoByIdHandler = async (req, res) => {
  const { db } = req.app.locals;
  const { id } = req.params;

  const getTodoByIdSchema = Joi.object().keys({
    id: Joi.number().required(),

  });
  const { value, error } = getTodoByIdSchema.validate(req.params);
  if (error) {
    return res.status(400).send('Bad Requests');
  }
  const todos = await todoService.getTodoByIdService(db, id);

  res.status(200).send(todos);
};

const postTodoHandler = async (req, res) => {
  const { body } = req;
  const { db } = req.app.locals;

  const postTodoSchema = Joi.object().keys({
    title: Joi.string().required(),
    status: Joi.any().valid('Completed', 'Not completed').required(),
  });
  const { value, error } = postTodoSchema.validate(body);
  if (error) {
    return res.status(400).send('Bad Requests');
  }

  const todo =  await todoService.postTodoService(body, db);
  res.status(201).send(todo);
};

const putTodoHandler = async (req, res) => {
  const { body } = req;
  const { db } = req.app.locals;
  const givenId = req.params.id;
  const putTodoSchemaOne = Joi.object().keys({

    title: Joi.string().required(),
    status: Joi.any().valid('Completed', 'Not completed').required(),
  });

  const putTodoSchemaTwo = Joi.object().keys({
    id: Joi.number().required(),

  });
  const { data, err } = putTodoSchemaTwo.validate(req.params);
  if (err) {
    return res.status(400).send('Bad Params');
  }
  const { value, error } = putTodoSchemaOne.validate(body);
  if (error) {
    return res.status(400).send('Bad Requests');
  }
  const todo = await todoService.putTodoService(body, givenId, db);

  res.status(200).send('todo updated');
};

const deleteTodoHandler = async (req, res) => {
  const { db } = req.app.locals;
  const { id } = req.params;

  const deleteTodoSchema = Joi.object().keys({
    id: Joi.number().required(),

  });
  const { data, err } = deleteTodoSchema.validate(req.params);
  if (err) {
    return res.status(400).send('Bad Params');
  }

  await todoService.deleteTodoService(id, db);
  res.status(200).send('todo deleted');
};

module.exports = {
  getTodosHandler, getTodoByIdHandler, postTodoHandler, putTodoHandler, deleteTodoHandler,
};
