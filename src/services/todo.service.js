const todoBasiceServices = require('./todo.basic.service');
const fsUtilities = require('../utilities/fsFunctions.utilities');
const { TODO_FILE_PATH } = require('../constants/configure');

const deleteTodo = async (id) => {
  try {
    await todoBasiceServices.getTodo(id);
    const allTodo = await todoBasiceServices.getAllTodo();
    const updatedTodoList = allTodo.filter((todo) => todo.id !== id);
    await fsUtilities.writeFile(TODO_FILE_PATH, ''); // empty the file first
    const writeAllTodoPromiseArr = updatedTodoList
      .map((todo) => todoBasiceServices.createTodo(todo));
    return Promise.all(writeAllTodoPromiseArr);
  } catch (error) {
    let errorObject = error;
    if (!errorObject.status) {
      errorObject = {
        status: 500,
        message: 'Error in accessing file',
      };
    }
    throw errorObject;
  }
};
const deleteStatusTodo = async (status) => {
  try {
    const allTodo = await todoBasiceServices.getAllTodo();
    if (allTodo.length === 0) {
      throw new Error('No todo found');
    }
    const todoToBeDeleted = allTodo.filter((todo) => todo.status === status);
    const updatedTodoList = allTodo.filter((todo) => todo.status !== status);
    if (todoToBeDeleted.length === 0) {
      throw new Error('No todo found');
    }
    await fsUtilities.writeFile(TODO_FILE_PATH, '');
    const writeAllTodoPromiseArr = updatedTodoList
      .map((todo) => todoBasiceServices.createTodo(todo));
    await Promise.all(writeAllTodoPromiseArr);
    return 'Success';
  } catch (error) {
    const errorObject = {
      status: 500,
      message: 'Error accessing file',
    };
    if (error.message === 'No todo found') {
      errorObject.status = 404;
      errorObject.message = error.message;
    }
    throw errorObject;
  }
};
module.exports = {
  deleteTodo,
  deleteStatusTodo,
};
