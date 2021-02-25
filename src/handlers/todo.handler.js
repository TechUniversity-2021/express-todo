const toDoServices = require('../services/todo.service');

const getToDoHandler = async (req, res) => {
  // console.log(req.app.locals.db);
  // const { db } = req.app.locals;
  const allTodos = await toDoServices.getToDos();
  // if (allTodos.length === 0) return res.status(400).send('No todos to be found');
  res.status(200).send(allTodos);
};

const getByIdToDoHandler = async (req, res) => {
  const toDoId = req.params.id;
  const fetchedToDo = await toDoServices.fetchToDo(toDoId);
  // const fetchedToDo = await toDoServices.fetchToDo(req, res);
  // console.log(fetchedToDo);
  if (fetchedToDo === null) return res.status(400).send('No todo to be found');
  res.status(200).send(fetchedToDo);
};

const createToDoHandler = async (req, res) => {
  const { body } = req;
  const createdTodo = await toDoServices.createToDo(body);
  // console.log(body);
  if (createdTodo.length === 0) return res.status(400).send('Failed to create todo');
  res.status(201).send(createdTodo);
};

const updateToDoHandler = async (req, res) => {
  const toDoId = req.params.id;
  const { body } = req;
  const updatedToDo = await toDoServices.updateToDo(body, toDoId);
  // const mockValue = [
  //   1,
  // ];
  const failedMockValue = [
    0,
  ];
  if (updatedToDo.toString() === failedMockValue.toString()) {
    // console.log('here');
    return res.status(400).send('Failed to update todo');
  }
  res.status(200).send(updatedToDo);
};

const deleteByIdToDoHandler = async (req, res) => {
  const toDoId = req.params.id;
  const deletedToDo = await toDoServices.deleteById(toDoId);
  // if (deletedToDo === 'OK') return res.sendStatus(400).send('Failed to delete todo');
  res.status(200).send(deletedToDo);
};

// const deleteByStatusToDoHandler = async (req, res) => {
//   const deletedToDoList = await toDoServices.deleteByStatus(req, res);
//   res.status(200).send(deletedToDo);
// };

module.exports = {
  getToDoHandler, createToDoHandler, updateToDoHandler, getByIdToDoHandler, deleteByIdToDoHandler,
};
