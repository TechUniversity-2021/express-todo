const fileUtils = require("../utils/fileUtils")


const todoRepository = require("../repository/todo.repository")

const getTodos = async (db) => {
  const todos = await todoRepository.getTodosDb(db);
  return todos;
}
const getTodosById = async (db, id) => {

  const todos = await todoRepository.getTodosByIdDb(db, id);
  console.log(todos)
  return todos;
}
const deleteById = async (db, id) => {
  const todos = await todoRepository.deletedToDoByDb(db, id);
  console.log(todos)
  return todos;
}
const deleteAll = async (db) => {
  const todos = await todoRepository.deleteAllToDoByDb(db);
  console.log(todos)
  return todos;
}
const deleteByStatus = async (db, status) => {
  const todos = await todoRepository.deleteByStatusDb(db, status);
  console.log(todos)
  return todos;
}
const createTodo = async (db, title, status) => {

  const todos = await todoRepository.createTodoDb(db, title, status)
  console.log(todos)
  return todos;
}
const updateTodo = async (db, title, status, id) => {
  const todos = await todoRepository.updateTodoDb(db, title, status, id)
  console.log(todos)
  return todos;
}

// const deleteById = async (req, res) => {
//   const fileData = await fileUtils.getFileData('../resources/todos.txt');
//   const todosLines = fileData.split('\n');
//   var formattedText;
//   todosLines.forEach((line) => {
//     //console.log(line,id.id);
//     if (line.startsWith(req.params.id)) {
//       //console.log("Hello")
//       formattedText = fileData.replace(line, "")
//       //fileUtils.updateFile('../resources/todos.txt', formattedText)

//     }
//   })
//   console.log("formated", formattedText)


//   const done = await fileUtils.writeFile('../resources/todos.txt', formattedText)
//   return done;
// };


// const getTodosById = async (id) => {
//   const fileData = await fileUtils.getFileData('../resources/todos.txt');
//   const todosLines = fileData.split('\n');



//   todosLines.forEach((line) => {
//     //console.log(line,id.id);
//     if (line.startsWith(id.id)) {
//       //console.log("Hello")
//       return "got";
//     }
//     return 'id not found'


//   })
// }

// const createTodo = async (content) => {
//   const newTodo = `\n${uuid()}|${content.todo}|Active`

//   const done = await fileUtils.appendFile('../resources/todos.txt', newTodo)
//   return done;

// }
// const updateTodo = async (id, content) => {
//   const fileData = await fileUtils.getFileData('../resources/todos.txt');
//   const todosLines = fileData.split('\n');
//   var formattedText;
//   todosLines.forEach((line) => {
//     //console.log(line,id.id);
//     if (line.startsWith(id.id)) {
//       //console.log("Hello")
//       formattedText = fileData.replace(line, `${id.id}|${content.todo}|${content.status}`)
//       //fileUtils.updateFile('../resources/todos.txt', formattedText)

//     }
//   })
//   console.log("formated", formattedText)


//   const done = await fileUtils.writeFile('../resources/todos.txt', formattedText)
//   return done;
// }
// const getTodos = async () => {
//   const fileData = await fileUtils.getFileData('../resources/todos.txt');
//   const todosLines = fileData.split('\n');

//   const todosObject = todosLines.map((todo) => {

//     const items = todo.split('|');
//     const object = {
//       id: items[0],
//       todo: items[1],
//       status: items[2],
//     };
//     return object;
//   });

//   return todosObject;
// };



module.exports = { getTodos, createTodo, updateTodo, getTodosById, deleteById, deleteAll, deleteByStatus };
