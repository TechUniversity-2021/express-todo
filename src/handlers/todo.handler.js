const Joi = require('joi');
const todoServices = require('../services/todo.services');

const todoGetHandler = async (req, res) => {
  const todoList = await todoServices.getTodos();
  res.status(200).send(todoList);
};

const todoGetByIdHandler = async (req, res) => {
  const todoId = req.params.id;
  const todoByIdList = await todoServices.getTodoById(todoId);
  return res.status(200).send(todoByIdList);
};

const todoDeleteByIdHandler = async (req, res) => {
  const response = await todoServices.deleteTodo(req.params.id);
  if (response.length === 0) {
    return res.status(404).send();
  }
  return res.status(200).send(response);
};

const todoPostHandler = async (req, res) => {
  const { body } = req;
  const message = await todoServices.postTodos(body);
  res.status(201).send(message);
};

const todoPutHandler = async (req, res) => {
  const { body } = req;
  const response = await todoServices.putTodos(req.params.id, body);
  res.status(200).send(response);
};

module.exports = {
  todoGetHandler, todoPostHandler, todoPutHandler, todoGetByIdHandler, todoDeleteByIdHandler,
};
