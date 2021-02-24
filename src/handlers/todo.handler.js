const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const content = await todoService.getTodo();
  res.status(200).send(content);
};

const getTodoById = async (req, res) => {
  const content = await todoService.getTodoWithId(req.params.id);
  if (content.length === 0) {
    return res.status(404).send(content);
    // add javascript return statement to the response being sent from the if conditional to ensure
    // that the request handler function exits(terminate) excuting code with the function once
    // a response has being sent to the client. Else -->
    // [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  }
  return res.status(200).send(content);
};

const createTodo = async (req, res) => {
  const createdTodo = await todoService.postTodo(req.body);
  res.status(201).send(createdTodo);
};

const updateTodo = async (req, res) => {
  const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
  res.status(200).send(updatedTodo);
};

const deleteTodoById = async (req, res) => {
  await todoService.deleteTodoWithId(req.params.id);
  res.status(200).send();
};

const deleteTodos = async (req, res) => {
  const response = await todoService.deleteAllTodos();
  res.status(200).send(response);
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  getTodoById,
  deleteTodoById,
  deleteTodos,
};
