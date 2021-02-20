const fs = require('fs');
<<<<<<< HEAD
var no=0;
=======

>>>>>>> ec137be... feat: add getTodoById function
function readData(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
function convertTodo(data)
{
    const todos = data.toString().split('\n');
    const todoObj= todos.map((todo) =>{
        const newTodo = todo.split('|');
<<<<<<< HEAD
        
=======
>>>>>>> ec137be... feat: add getTodoById function
        return {id : newTodo[0], todo: newTodo[1], status: newTodo[2]};
    })
        return todoObj;
 
   
}

<<<<<<< HEAD
function writeData(filePath, content) {
    return new Promise((resolve, request) => {
        fs.appendFile(filePath, content, err => {
            if(err) {
                reject(err);
            }
        })
    })
}

async function getArray()
{
  const todo = await readData('./src/resources/file.txt')
  const todos = convertTodo(todo);
  return todo;
}

 function convertTodoByUser(data, id)
{
  
 
    const todoByUser =[]
    todoByUser[0] = id;
    todoByUser[1] = data.todo;
    todoByUser[2] = data.status;
    

    var fileContent = todoByUser.join('|');
    var newfileContent= fileContent.concat('\n')

   
  
    return newfileContent;


}

async function changeData(todos,body,givenId)
{
    
     const newTodo=[];
     const oldTodo=[];
     todos.forEach((todo) => {
      if(givenId === todo.id)
      {
        
        oldTodo[0]=todo.id;
        newTodo[0]= body.id;
        oldTodo[1]=todo.todo;
        newTodo[1]= body.todo;
        oldTodo[2]=todo.status
        newTodo[2]=body.status;
          
      }
      })
      const oldfileContent = oldTodo.join('|');
      const newfileContent = newTodo.join('|');
      console.log(newfileContent);
      const data = await readData('./src/resources/file.txt');
      const newContent=data.replace(oldfileContent, newfileContent);
      
      await fs.writeFile('./src/resources/file.txt', newContent,err => {
        if(err) {
            console.log(err);
        }
    })
      
      return todos;

}

async function changeDeleteData(todos,givenId)
{
    
     const newTodo=[];
     const oldTodo=[];
     todos.forEach((todo) => {
      if(givenId === todo.id)
      {
        
        oldTodo[0]=todo.id;
        
        oldTodo[1]=todo.todo;
     
        oldTodo[2]=todo.status
       
          
      }
      })
      const oldfileContent = oldTodo.join('|');
  
     
      const data = await readData('./src/resources/file.txt');
      const newContent=data.replace(oldfileContent, '');
      
      await fs.writeFile('./src/resources/file.txt', newContent,err => {
        if(err) {
            console.log(err);
        }
    })
      
      return todos;

}




module.exports={readData, convertTodo, writeData, convertTodoByUser, changeData, changeDeleteData };
=======
// function fetchTodoById(data) {
//     const todos = data.toString().split('\n');
//     const todoObj= todos.map((todo) =>{
//         return  todo.split('|')});

// }

module.exports={readData, convertTodo};
>>>>>>> ec137be... feat: add getTodoById function
