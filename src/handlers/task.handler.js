const {getTodosService, postTodoService, putTodoService, deleteTodoService}= require('../services/task.service');
const {writeData}=require('../utils/task.util')
const Joi=require('joi')

const getTodosHandler = async (req, res) => {
  const todoList = await getTodosService();
    res.status(200).send(todoList);
};

const getTodoByIdHandler = async (req,res) => {
  const todos = await getTodosService();
  const todoList=[{}];
  const id=req.params.id;

  // const getTodoByIdSchema = Joi.object().keys({
  //   id: Joi.number().required(),

  // });
  // const { value, error } = getTodoByIdSchema.validate(id);
  // if (error) {
  //   return res.status(400).send('Bad Requests');
  // }
  todos.forEach((todo) => {
    if(id === todo.id)
    {
      
      todoList[0].id = todo.id;
      todoList[0].todo = todo.todo;
      todoList[0].status = todo.status;
        
    }
    })
  todoList[0].id= id;
  res.status(200).send(todoList);
}


const postTodoHandler = async (req, res) => {
    const {body} = req;
    
      const postTodoSchema = Joi.object().keys({
        todo: Joi.string().required(),
    status: Joi.any().valid('Completed', 'Not completed').required(),
      });
      const { value, error } = postTodoSchema.validate(body);
      if (error) {
        return res.status(400).send('Bad Requests');
      }
    const arrayLen =await getTodosService()
    postTodoService(body, arrayLen.length);
    res.status(200).send('Todo inserted');


}


const putTodoHandler = async (req, res) => {
  const {body}= req;
  const givenId=req.params.id;
  const putTodoSchemaOne = Joi.object().keys({
    id:Joi.number().required(),
    todo: Joi.string().required(),
status: Joi.any().valid('Completed', 'Not completed').required(),
  });

  const putTodoSchemaTwo = Joi.object().keys({
    id: Joi.number().required(),

  });
  const { data, err } = putTodoSchemaTwo.validate(givenId);
  if (err) {
    return res.status(400).send('Bad Params');
  }
  const { value, error } = putTodoSchemaOne.validate(body);
  if (error) {
    return res.status(400).send('Bad Requests');
  }
  const todos=putTodoService(body,givenId);

   res.status(200).send("todo updated");
}


const deleteTodoHandler = async (req, res) => {
  
  const givenId= req.params.id;
  const deleteTodoSchema = Joi.object().keys({
    params: Joi.number().required(),

  });
  const { data, err } = deleteTodoSchema.validate(req);
  if (err) {
    return res.status(400).send('Bad Params');
  }
  const todos = deleteTodoService(givenId);
  res.status(200).send("todo deleted");
}

module.exports = {
  getTodosHandler, getTodoByIdHandler, postTodoHandler , putTodoHandler, deleteTodoHandler
};
