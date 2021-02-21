const fileUtil = require('../utils/fileUtil');

const createNewTodo = async (reqBody) => {
  const createNewTodoStatus = await fileUtil.writeFile('./resources/todos.txt', reqBody);
  return createNewTodoStatus;
};

const getTodos = (fileData) => {
  let todosArray = fileData.toString().split('\n');
  todosArray = todosArray.filter((todo) => todo !== '');
  return todosArray.map((todo) => {
    const todoData = todo.split('|');
    return {
      id: todoData[0],
      todo: todoData[1],
      status: todoData[2],

    };
  });
};

const updateExistingTodo = async (todoId, newTodo) => {
// in service:  "todo_id_of_pushya" , new Todo:  { todo: 'walk the dog', status: 'active' }
//  console.log("in service: " , todoId, ", new Todo: " ,newTodo);
  const todoFileData = await fileUtil.readFile('./resources/todos.txt');
  const parsedTodos = getTodos(todoFileData);
  // let index;
  const existingTodo = parsedTodos.filter((x) => x.id === JSON.parse(todoId));
  const existingTodoObject = existingTodo[0];
  // console.log("existing todo: " + JSON.stringify(existingTodo));
  existingTodoObject.todo = newTodo.todo;
  existingTodoObject.status = newTodo.status;
  const newTodoList = parsedTodos.map((parsedTodo) => {
    if (parsedTodo.id === JSON.parse(todoId)) return existingTodoObject;
    return parsedTodo;
  });
  const finalTodoArray = newTodoList.map((eachTodo) => {
    const eachTodoArray = [];
    eachTodoArray.push(eachTodo.id);
    eachTodoArray.push(eachTodo.todo);
    eachTodoArray.push(eachTodo.status);
    const eachTodoString = `${eachTodoArray.join('|')}\n`;
    return eachTodoString;
  });
  const finalTodoData = finalTodoArray.join('\n');
  const updateFileStatus = await fileUtil.updateFile('./resources/todos.txt', finalTodoData);
  return updateFileStatus;
};

module.exports = {
  getTodos,
  createNewTodo,
  updateExistingTodo,
};
