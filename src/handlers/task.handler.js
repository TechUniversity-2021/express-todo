const {getTodosService}= require('../services/task.service');

const getTodosHandler = async (req, res) => {
  const todoList = await getTodosService();
    res.status(200).send(todoList);
};

const getTodoByIdHandler = async (req,res) => {
  const todos = await getTodosService();
  const todoList=[{}];
  
  todos.forEach((todo) => {
    if(req.params.id === todo.id)
    {
      
      todoList[0].id = todo.id;
      todoList[0].todo = todo.todo;
      todoList[0].status = todo.status;
        
    }
    })
  todoList[0].id= req.params.id
  res.status(200).send(todoList);
}


const postTodoHandler = async (req, res) => {
  
}


module.exports = {
  getTodosHandler, getTodoByIdHandler
};
