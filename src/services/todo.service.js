/* eslint-disable no-param-reassign */
const { v4: uuidv4 } = require('uuid');
const fileOps = require('../utilities/fsFunctions.utilities');
const repoOperations = require('../repository/todo.repository');
const { TODO_FILE_PATH } = require('../constants/configure');
const NonExistentError = require('../errors/nonExistent.errors');

const getAllTodo = async (db) => {
  const todoList = await repoOperations.getAllTodo(db);
  return todoList;
};

const createTodo = async (todo) => {
  let id = uuidv4();
  if (!todo.status) {
    todo.status = 'incomplete';
  }
  if (todo.id) {
    id = todo.id;
  }
  const todoRawData = `${id}|${todo.description}|${todo.status}\n`;
  const todoObject = {
    id,
    description: todo.description,
    status: todo.status,

  };
  await fileOps.appendFile(TODO_FILE_PATH, todoRawData);
  return todoObject;
};

const getTodo = async (id) => {
  const rawFileData = await fileOps.readFile(TODO_FILE_PATH);
  if (rawFileData.length === 0) {
    throw new NonExistentError('Todo not found');
  }
  const todoRawList = rawFileData.split('\n');
  const todoList = todoRawList.filter((todo) => todo !== '').map((todo) => {
    const elements = todo.split('|');
    const todoObject = {
      id: elements[0],
      description: elements[1],
      status: elements[2],
    };
    return todoObject;
  });
  const requiredTodo = todoList.filter((todoObject) => todoObject.id === id)[0];
  if (!requiredTodo) {
    throw new NonExistentError('Todo not found');
  }
  return requiredTodo;
};

const deleteAllTodo = async () => {
  const message = await fileOps.writeFile(TODO_FILE_PATH, '');
  return message;
};

const updateTodo = async (id, updateData) => {
  const allTodo = await getAllTodo();
  const requiredTodo = allTodo.filter((todo) => todo.id === id);
  if (requiredTodo.length === 0) {
    throw new NonExistentError('Todo not found');
  }
  const updatedTodoList = allTodo.map((todo) => {
    const todoCopy = { ...todo };
    if (todoCopy.id === id) {
      todoCopy.description = updateData.description;
      todoCopy.status = updateData.status;
    }
    return todoCopy;
  });
  await fileOps.writeFile(TODO_FILE_PATH, ''); // empty the file first
  // eslint-disable-next-line arrow-body-style
  const writeAllTodoPromiseArr = updatedTodoList.map((todo) => {
    // console.log(todo);
    return createTodo(todo);
  });
  await Promise.all(writeAllTodoPromiseArr);
  const updatedTodo = {
    id,
    ...updateData,
  };
  return updatedTodo;
};

const deleteTodo = async (id) => {
  const allTodo = await getAllTodo();
  const todoToBeDeleted = allTodo.filter((todo) => todo.id === id);
  if (todoToBeDeleted.length === 0) {
    throw new NonExistentError('Todo not found');
  }
  const updatedTodoList = allTodo.filter((todo) => todo.id !== id);
  await fileOps.writeFile(TODO_FILE_PATH, ''); // empty the file first
  const writeAllTodoPromiseArr = updatedTodoList
    .map((todo) => createTodo(todo));
  await Promise.all(writeAllTodoPromiseArr);
  return 'Success';
};
const deleteStatusTodo = async (status) => {
  const allTodo = await getAllTodo();
  if (allTodo.length === 0) {
    throw new NonExistentError('Todo not found');
  }
  const todoToBeDeleted = allTodo.filter((todo) => todo.status === status);
  const updatedTodoList = allTodo.filter((todo) => todo.status !== status);
  if (todoToBeDeleted.length === 0) {
    throw new NonExistentError('Todo not found');
  }
  await fileOps.writeFile(TODO_FILE_PATH, '');
  const writeAllTodoPromiseArr = updatedTodoList
    .map((todo) => createTodo(todo));
  await Promise.all(writeAllTodoPromiseArr);
  return 'Success';
};

module.exports = {
  getAllTodo,
  createTodo,
  getTodo,
  deleteAllTodo,
  updateTodo,
  deleteTodo,
  deleteStatusTodo,
};
