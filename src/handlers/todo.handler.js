const toDoServices = require('../services/todo.service');

const getToDoHandler = async (req, res) => {
  // console.log(req.app.locals.db);
  const { db } = req.app.locals;
  const allTodos = await toDoServices.getToDos(db);
  if (allTodos.length === 0) return res.status(400).send('No todos to be found');
  res.status(200).send(allTodos);
};

const getByIdToDoHandler = async (req, res) => {
  const { db } = req.app.locals;
  const toDoId = req.params.id;
  const fetchedToDo = await toDoServices.fetchToDo(db, toDoId);
  // const fetchedToDo = await toDoServices.fetchToDo(req, res);
  if (fetchedToDo.length === 0) return res.status(400).send('No todo to be found');
  res.status(200).send(fetchedToDo);
};

const postToDoHandler = async (req, res) => {
  const { db } = req.app.locals;
  const { body } = req;
  const postedTodo = await toDoServices.createToDo(db, body);
  // console.log(body);
  if (postedTodo.length === 0) return res.status(400).send('Failed to create todo');
  res.status(201).send(postedTodo);
};

const putToDoHandler = async (req, res) => {
  const toDoId = req.params.id;
  const { db } = req.app.locals;
  const { body } = req;
  const updatedToDo = await toDoServices.updateToDo(db, body, toDoId);
  if (updatedToDo.length === 0) return res.status(400).send('Failed to update todo');
  res.status(200).send(updatedToDo);
};

const deleteByIdToDoHandler = async (req, res) => {
  const toDoId = req.params.id;
  const { db } = req.app.locals;
  const deletedToDo = await toDoServices.deleteById(db, toDoId);
  if (deletedToDo.length === 0) return res.status(400).send('Failed to delete todo');
  res.status(200).send(deletedToDo);
};

// const deleteByStatusToDoHandler = async (req, res) => {
//   const deletedToDoList = await toDoServices.deleteByStatus(req, res);
//   res.status(200).send(deletedToDo);
// };

module.exports = {
  getToDoHandler, postToDoHandler, putToDoHandler, getByIdToDoHandler, deleteByIdToDoHandler,
};
