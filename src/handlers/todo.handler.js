const todoService = require('../services/todo.service');

const getTodos = async (req, res) => {
  const content = await todoService.getTodo(req);
  // console.log(req);
  res.status(200).send(content);
};

// const getTodos = async (req, res) => {
//   if (req.query.search) {
//     const content = await todoService.getTodoWithQuery(req.query.search);
//     res.status(200).send(content);
//   } else {
//     const content = await todoService.getTodo();
//     res.status(200).send(content);
//   }
// };

const getTodoById = async (req, res) => {
  const content = await todoService.getTodoWithId(req);
  res.status(200).send(content);
};

// const getTodoByQuery = async (req, res) => {
//   const content = await todoService.getTodoWithQuery(req.query.search);
//   res.status(200).send(content);
// };

const createTodo = async (req, res) => {
  await todoService.postTodo(req.body);
  res.status(201).send();
  // should send created body
};

const updateTodo = async (req, res) => {
  await todoService.updateTodo(req.params.id, req.body);
  res.status(200).send();
};

const deleteTodoById = async (req, res) => {
  await todoService.deleteTodoWithId(req.params.id);
  res.status(204).send();
};

// TODO------
const deleteTodoByStatus = async (req, res) => {
  await todoService.deleteTodoWithStatus(req.params.status);
  console.log(req);
  res.send('todo successfully deleted');
};

const deleteTodos = async (req, res) => {
  await todoService.deleteAllTodos();
  res.status(204).send();
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  getTodoById,
  // getTodoByQuery,
  deleteTodoById,
  deleteTodos,
  deleteTodoByStatus,
};
