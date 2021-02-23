const TodosService = require("../services/todo.services")


const deleteByIdToDoHandler = async (req, res) => {
  // console.log("here");
  const deletedToDo = await TodosService.deleteById(req, res);
  res.status(200).send(deletedToDo);
};

const getTodosHandlerById = async (req, res) => {

  let id = req.params.id;

  const todo = await TodosService.getTodosById(id);
  // console.log(todo)
  res.status(200).send(todo)
}
const getTodosHandler = async (req, res) => {
  const todo = await TodosService.getTodos();
  console.log(todo)
  res.status(200).send(todo)
}

const createTodo = async (req, res) => {
  const todo = await TodosService.createTodo(req.body)

  res.status(201).send(todo)
}

const updateTodoHandler = async (req, res) => {
  let id = req.params;

  const done = await TodosService.updateTodo(id, req.body)
  res.status(200).send(done)
}

module.exports = {
  getTodosHandler,
  createTodo,
  updateTodoHandler,
  getTodosHandlerById,
  deleteByIdToDoHandler
};

