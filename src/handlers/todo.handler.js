const Joi = require('joi');
const todoServices = require('../services/todo.services');

const todoGetHandler = async (req, res) => {
  const { db } = req.app.locals;
  const todoList = await todoServices.getTodos(db);
  res.status(200).send(todoList);
};

const todoGetByIdHandler = async (req, res) => {
  // const todoSchema = Joi.object().keys({
  //   id: Joi.number().required(),
  // });
  // const { value, error } = todoSchema.validate(req.params);
  // if (error) {
  //   return res.status(400).send('Bad Request');
  // }
  const todoId = req.params.id;
  const { db } = req.app.locals;
  const todoByIdList = await todoServices.getTodoById(db, todoId);
  // const todoById = todoList.filter((todo) => (todo.id === req.params.id ? todo : null));
  return res.status(200).send(todoByIdList);
};

const todoDeleteByIdHandler = async (req, res) => {
  // const { body } = req;
  const { db } = req.app.locals;
  // const todoSchema = Joi.object().keys({
  //   id: Joi.number().required(),
  // });
  // const { value, error } = todoSchema.validate(body);
  // if (error) {
  //   return res.status(400).send('Bad Request');
  // }
  // const todoList = await todoServices.getTodos();
  // const updatedListOfTodos = todoList.filter((todo) => (todo.id === body.id));
  // const todoFileList = updatedListOfTodos.map((todoObj) => {
  //   const temp = `${todoObj.id}|${todoObj.todo}|${todoObj.status}`;
  //   return temp;
  // });
  // const todoUpdated = todoFileList.toString().replaceAll(',', '\n');
  const response = await todoServices.deleteTodo(db, req.params.id);
  return res.status(200).send(response);
};

const todoPostHandler = async (req, res) => {
  const { body } = req;
  const { db } = req.app.locals;
  // const todoList = await todoServices.getTodos();
  // const todoPost = `\n${parseInt(todoList[todoList.length - 1].id, 10) + 1}|${body.todo}|${body.status}`;
  const message = await todoServices.postTodos(db, body);
  res.status(201).send(message);
};

const todoPutHandler = async (req, res) => {
  const { body } = req;
  const { db } = req.app.locals;
  // const todoList = await todoServices.getTodos();
  // const todoListUpdated = todoList.map((todoObj) => {
  //   if (todoObj.id === body.id) {
  //     const updatedTodo = todoObj;
  //     updatedTodo.todo = body.todo;
  //     updatedTodo.status = body.status;
  //     return updatedTodo;
  //   }
  //   return todoObj;
  // });

  // const todoFileList = todoListUpdated.map((todoObj) => {
  //   const temp = `${todoObj.id}|${todoObj.todo}|${todoObj.status}`;
  //   return temp;
  // });
  // const todoPutUpdated = todoFileList.toString().replaceAll(',', '\n');
  const response = await todoServices.putTodos(db, req.params.id, body);
  res.status(200).send(response);
};

module.exports = {
  todoGetHandler, todoPostHandler, todoPutHandler, todoGetByIdHandler, todoDeleteByIdHandler,
};
