const fileRead = require('../utils/PromisifyFileRead');

const getTodos = async () => { 
    const fileContent = await fileRead.promisifyFs('src/resources/todo.txt')
    let todos = fileContent.toString().split('\n')
   const todoObjects = todos.map(function (todo) {
       let tempTodoObj = todo.split('|')
       return {
           id: tempTodoObj[0],
           todo: tempTodoObj[1],
           status: tempTodoObj[2]
       }
   })
    return todoObjects;
}

module.exports = { getTodos };