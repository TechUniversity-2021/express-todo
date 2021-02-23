const TodosService=require("../services/todo.services")

const getTodosHandler = async (req, res) => {

    const todo = await TodosService.getTodos(req.app.locals.db);
    res.status(200).send(todo);
  
  };

const getTodosHandlerById=async(req,res)=>{
    let id=req.params.id;
  
    const todo=await TodosService.getTodosById(req.app.locals.db,id);
    console.log(todo)
    res.status(200).send(todo);
}

const deleteByIdToDoHandler= async(req,res)=>{
  let id=req.params.id;
  const todo=await TodosService.deleteById(req.app.locals.db,id);
  console.log(todo)
    res.status(200).send(todo);
}
const deleteByStatusToDoHandler= async(req,res)=>{
  let status=req.params.status;
  const todo=await TodosService.deleteByStatus(req.app.locals.db,status);
  console.log(todo)
    res.status(200).send(todo);

}

const deleteAllToDoHandler= async(req,res)=>{

  const todo=await TodosService.deleteAll(req.app.locals.db);
  console.log(todo)
    res.status(200).send(todo);


}

const createTodoHandler= async(req,res)=>{
  let title=req.body.title;
  let status=req.body.status;

  const todo=await TodosService.createTodo(req.app.locals.db,title,status)
  console.log("************")
  console.log(todo)
  res.status(200).send(todo);
}

const updateTodoHandler=async(req,res)=>{
  let title=req.body.title;
  let status=req.body.status;
  let id=req.params.id;
  const todo=await TodosService.updateTodo(req.app.locals.db,title,status,id)
  console.log(todo)
  res.status(200).send(todo);


}
// const deleteByIdToDoHandler = async (req, res) => {
//   // console.log("here");
//   const deletedToDo = await TodosService.deleteById(req, res);
//   res.status(200).send(deletedToDo);
// };

// const getTodosHandlerById=async(req,res)=>{
  
//   let id=req.params.id;

//   const todo=await TodosService.getTodosById(id);
// // console.log(todo)
//   res.status(200).send(todo)
// }
// const getTodosHandler= async (req,res) => {
//   const todo = await TodosService.getTodos();
//   console.log(todo)
//   res.status(200).send(todo)
// }

// const createTodo=async (req,res)=>{
//     const todo =await TodosService.createTodo(req.body)
  
//     res.status(201).send(todo)
// }

// const updateTodoHandler= async (req,res)=>{
// let id =req.params;

// const done=await TodosService.updateTodo(id,req.body)
// res.status(200).send(done)
// }

  module.exports = {
    getTodosHandler,
    createTodoHandler,
    updateTodoHandler,
    getTodosHandlerById,
    deleteByIdToDoHandler,
    deleteAllToDoHandler,
    deleteByStatusToDoHandler
  };


