// const fileUtil = require('../utils/fileUtil');
const todosService = require('../services/todo.service');

const getTodos = async (req, res) => {
  // const todoFileData = await fileUtil.readFile('./resources/todos.txt');
  const { db } = req.app.locals;
  const todoData = await todosService.getTodos(db);
  return res.status(200).send(todoData);
};

const getTodoById = async (req, res) => {
  // const todoFileData = await fileUtil.readFile('./resources/todos.txt');
  const { db } = req.app.locals;
  const todoData = await todosService.getTodoById(db, req.params.id);
  return res.status(200).send(todoData);
};

const createTodo = async (req, res) => {
  // console.log(req.body);
  try {
    await todosService.createNewTodo(req.body);
    res.status(201).send('success');
  } catch (err) {
    res.send('server error');
  }
};

const updateTodo = async (req, res) => {
  // console.log(`my request : ${JSON.stringify(req.params.id)}`);
  // const todoId = JSON.stringify(req.params.id);

  const { db } = req.app.locals;
  const updateStatus = await todosService.updateTodo(db, req.params.id, req.body.title);
  return res.status(200).send(updateStatus);

  // console.log("update : " ,req.body);
  // const updateStatus = await todosService.updateTodo(todoId, req.body);
  // res.status(200).send(updateStatus);
};

const deleteTodo = async (req, res) => {
// console.log(req.params);
  const deleteTodoStatus = await todosService.deleteTodo(req.params.id);
  res.status(200).send(deleteTodoStatus);
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
};
