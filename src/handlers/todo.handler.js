const todoService = require("../services/todo.service");

const getTodos = async (req, res) => {
  let content;
  if (req.query.search) {
    content = await todoService.getTodoByQuery(req.query.search);
  } else {
    content = await todoService.getTodo();
  }
  res.status(200).send(content);
};

const getTodoById = async (req, res) => {
  const content = await todoService.getTodoWithId(req.params.id);
  res.status(200).send(content);
};

const createTodo = async (req, res) => {
  await todoService.postTodo(req.body);
  res.send(`todo ${JSON.stringify(req.body.todo)} added`);
  // The 204 status code is usually sent out in response to a PUT, POST, or DELETE request when the
  // REST API declines to send back any status message or representation in the response message’s body.
};

const updateTodo = async (req, res) => {
  await todoService.updateTodo(req.params.id, req.body);
  res.send();
};

const deleteTodoById = async (req, res) => {
  await todoService.deleteTodoWithId(req.params.id);
  console.log("id", req.params);
  res.send("todo successfully deleted");
};

//TODO------
const deleteTodoByStatus = async (req, res) => {
  await todoService.deleteTodoWithStatus(req.params.status);
  console.log(req);
  res.send("todo successfully deleted");
};

const deleteTodos = async (req, res) => {
  await todoService.deleteAllTodos();
  res.sendStatus(204);
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  getTodoById,
  deleteTodoById,
  deleteTodos,
  deleteTodoByStatus,
};
