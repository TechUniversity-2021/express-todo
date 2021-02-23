const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  // console.log(req.app.locals);
  const { db } = req.app.locals;
  const content = await todoService.getTodo(db);
  res.status(200).send(content);
};

const getTodoById = async (req, res) => {
  const { db } = req.app.locals;
  const content = await todoService.getTodoWithId(db, req.params.id);
  if (content.length === 0) {
    return res.status(400).send(content);
    // add javascript return statement to the response being sent from the if conditional to ensure
    // that the request handler function exits(terminate) excuting code with the function once
    // a response has being sent to the client. Else -->
    // [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  }
  return res.status(200).send(content);
};

// const getTodos = async (req, res) => {
//   const content = await todoService.getTodo();
//   res.status(200).send(content);
// };

// const getTodoById = async (req, res) => {
//   const content = await todoService.getTodoWithId(req.params.id);
//   res.status(200).send(content);
// };

// const getTodoByQuery = async (req, res) => {
//   const content = await todoService.getTodoWithQuery(req.query.search);
//   res.status(200).send(content);
// };

// TODO
const getTodoByQuery = async (req, res) => {
  const { db } = req.app.locals;
  const content = await todoService.getTodoWithQuery(db, req.query.search);
  res.status(200).send(content);
};

const createTodo = async (req, res) => {
  const { db } = req.app.locals;
  const createdTodo = await todoService.postTodo(db, req.body);
  res.status(201).send(createdTodo);
};

// const createTodo = async (req, res) => {
//   await todoService.postTodo(req.body);
//   res.status(201).send();
//   // should send created body
// };

// const updateTodo = async (req, res) => {
//   await todoService.updateTodo(req.params.id, req.body);
//   res.status(200).send();
// };

const updateTodo = async (req, res) => {
  const { db } = req.app.locals;
  const updatedTodo = await todoService.updateTodo(db, req.params.id, req.body);
  res.status(200).send(updatedTodo);
};

// const deleteTodoById = async (req, res) => {
//   await todoService.deleteTodoWithId(req.params.id);
//   res.status(204).send();
// };

const deleteTodoById = async (req, res) => {
  const { db } = req.app.locals;
  const deletedTodo = await todoService.deleteTodoWithId(db, req.params.id);
  res.status(200).send(deletedTodo);
};

// TODO------
// const deleteTodoByStatus = async (req, res) => {
//   await todoService.deleteTodoWithStatus(req.params.status);
//   console.log(req);
//   res.send('todo successfully deleted');
// };

const deleteTodos = async (req, res) => {
  await todoService.deleteAllTodos();
  res.status(204).send();
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  getTodoById,
  getTodoByQuery,
  deleteTodoById,
  deleteTodos,
  // deleteTodoByStatus,
};
