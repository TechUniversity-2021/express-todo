const todosService = require('../services/todo.services');

const getTodosHandler = async (req, res) => {
  const todo = await todosService.getTodos(req.app.locals.db);
  // if (todo.length === 0) {
  //   res.status(501).send(todo);
  // }
  // console.log('todo', todo);
  res.status(200).send(todo);
};

const getTodosHandlerById = async (req, res) => {
  const { id } = req.params;

  const todo = await todosService.getTodosById(req.app.locals.db, id);
  // console.log(todo);
  res.status(200).send(todo);
};

const deleteByIdToDoHandler = async (req, res) => {
  const { id } = req.params;
  const todo = await todosService.deleteById(req.app.locals.db, id);
  // console.log(todo);
  // res.status(200).send(todo);
  res.sendStatus(200).send(todo);
};
const deleteByStatusToDoHandler = async (req, res) => {
  const { status } = req.params;
  const todo = await todosService.deleteByStatus(req.app.locals.db, status);
  // console.log(todo);
  res.status(200).send(todo);
};

const deleteAllToDoHandler = async (req, res) => {
  const todo = await todosService.deleteAll(req.app.locals.db);
  // console.log(todo);
  res.sendStatus(200).send(todo);
};

const createTodoHandler = async (req, res) => {
  const { title } = req.body;
  const { status } = req.body;

  const todo = await todosService.createTodo(req.app.locals.db, title, status);
  // console.log('************');
  // console.log(todo);
  res.status(200).send(todo);
};

const updateTodoHandler = async (req, res) => {
  const { title } = req.body;
  const { status } = req.body;
  const { id } = req.params;
  const todo = await todosService.updateTodo(req.app.locals.db, title, status, id);
  // console.log(todo);
  res.status(200).send(todo);
};
// const deleteByIdToDoHandler = async (req, res) => {
//   // console.log("here");
//   const deletedToDo = await todosService.deleteById(req, res);
//   res.status(200).send(deletedToDo);
// };

// const getTodosHandlerById=async(req,res)=>{

//   let id=req.params.id;

//   const todo=await todosService.getTodosById(id);
// // console.log(todo)
//   res.status(200).send(todo)
// }
// const getTodosHandler= async (req,res) => {
//   const todo = await todosService.getTodos();
//   console.log(todo)
//   res.status(200).send(todo)
// }

// const createTodo=async (req,res)=>{
//     const todo =await todosService.createTodo(req.body)

//     res.status(201).send(todo)
// }

// const updateTodoHandler= async (req,res)=>{
// let id =req.params;

// const done=await todosService.updateTodo(id,req.body)
// res.status(200).send(done)
// }

module.exports = {
  getTodosHandler,
  createTodoHandler,
  updateTodoHandler,
  getTodosHandlerById,
  deleteByIdToDoHandler,
  deleteAllToDoHandler,
  deleteByStatusToDoHandler,
};
