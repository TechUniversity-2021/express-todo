/* eslint-disable no-use-before-define */
const fileUtil = require('../utils/fileUtil');

const path = './resources/todos.txt';
const createNewTodo = async (reqBody) => {
  const createNewTodoStatus = await fileUtil.writeFile(path, reqBody);
  return createNewTodoStatus;
};

// return array of todo objects
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

const updateTodo = async (todoId, newTodo) => {
  // in service:  "todo_id_of_pushya" , new Todo:  { todo: 'walk the dog', status: 'active' }
  //  console.log("in service: " , todoId, ", new Todo: " ,newTodo);
  const todoFileData = await fileUtil.readFile(path);
  const parsedTodos = getTodos(todoFileData);
  const existingTodo = parsedTodos.filter((todo) => todo.id === JSON.parse(todoId));
  const existingTodoObject = existingTodo[0];
  // console.log("existing todo: " + JSON.stringify(existingTodo));
  existingTodoObject.todo = newTodo.todo;
  existingTodoObject.status = newTodo.status;
  const newTodoList = parsedTodos.map((parsedTodo) => {
    if (parsedTodo.id === JSON.parse(todoId)) return existingTodoObject;
    return parsedTodo;
  });
  const finalTodoArray = convertTodoToString(newTodoList);
  const finalTodoData = finalTodoArray.join('\n');
  const updateFileStatus = await fileUtil.updateFile(path, finalTodoData);
  return updateFileStatus;
};
const deleteTodo = async (todoId) => {
  const todoFileData = await fileUtil.readFile(path);
  const parsedTodos = getTodos(todoFileData);
  const filteredTodos = parsedTodos.filter((todo) => todo.id !== todoId);
  // console.log(filteredTodos);
  const finalTodoArray = convertTodoToString(filteredTodos);
  const finalTodoData = finalTodoArray.join('\n');
  const updateFileStatus = await fileUtil.updateFile(path, finalTodoData);
  return updateFileStatus;
};

// converts todo array of objects to string with | and \n for new line
const convertTodoToString = (todos) => {
  const finalTodoArray = todos.map((eachTodo) => {
    const eachTodoArray = [];
    eachTodoArray.push(eachTodo.id);
    eachTodoArray.push(eachTodo.todo);
    eachTodoArray.push(eachTodo.status);
    const eachTodoString = `${eachTodoArray.join('|')}\n`;
    return eachTodoString;
  });
  return finalTodoArray;
};
module.exports = {
  getTodos,
  createNewTodo,
  updateTodo,
  deleteTodo,
};
