const fs = require('fs');

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
        return {id : newTodo[0], todo: newTodo[1], status: newTodo[2]};
    })
        return todoObj;
 
   
}

// function fetchTodoById(data) {
//     const todos = data.toString().split('\n');
//     const todoObj= todos.map((todo) =>{
//         return  todo.split('|')});

// }

module.exports={readData, convertTodo};