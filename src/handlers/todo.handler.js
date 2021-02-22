const toDoServices = require('../services/todo.service');

const getToDoHandler = async (req, res) => {
  // console.log(req.app.locals.db);
  const { db } = req.app.locals;
  const allTodos = await toDoServices.getToDos(db);
  res.status(200).send(allTodos);
};

const postToDoHandler = async (req, res) => {
  // const { body } = req;
  const postedTodo = await toDoServices.postFileData(req, res);
  res.status(200).send(postedTodo);
};

const putToDoHandler = async (req, res) => {
  const updatedToDo = await toDoServices.updateFileData(req, res);
  res.status(200).send(updatedToDo);
};

const getByIdToDoHandler = async (req, res) => {
  const { db } = req.app.locals;
  const fetchedToDo = await toDoServices.dbFetchToDo(db, req, res);
  // const fetchedToDo = await toDoServices.fetchToDo(req, res);
  res.status(200).send(fetchedToDo);
};

const deleteByIdToDoHandler = async (req, res) => {
  // console.log("here");
  const deletedToDo = await toDoServices.deleteById(req, res);
  res.status(200).send(deletedToDo);
};

const deleteByStatusToDoHandler = async (req, res) => {
  const deletedToDoList = await toDoServices.deleteByStatus(req, res);
  res.status(200).send(deletedToDo);
};

module.exports = {
  getToDoHandler, postToDoHandler, putToDoHandler, getByIdToDoHandler, deleteByIdToDoHandler, deleteByStatusToDoHandler,
};
