const fileOps = require('../utilities/fsFunctions.utilities');
const { TODO_FILE_PATH } = require('../constants/configure');

let defaultId = 1;
const getAllTodo = async () => {
  try {
    const rawFileData = await fileOps.readFile(TODO_FILE_PATH);
    if (rawFileData.length === 0) {
      return [];
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
    return todoList;
  } catch (error) {
    throw new Error('Error reading file data');
  }
};

const postTodo = async (todo) => {
  try {
    let id = defaultId;
    if (todo.id) {
      id = todo.id;
    } else {
      defaultId += 1;
    }
    const todoRawData = `${id}|${todo.description}|${todo.status}\n`;
    const message = await fileOps.appendFile(TODO_FILE_PATH, todoRawData);
    return message;
  } catch (error) {
    throw new Error('Error appending data');
  }
};

const getTodo = async (id) => {
  const TODO_NOT_FOUND_ERROR = new Error('Todo not found');
  try {
    const rawFileData = await fileOps.readFile(TODO_FILE_PATH);
    if (rawFileData.length === 0) {
      throw TODO_NOT_FOUND_ERROR;
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
      throw TODO_NOT_FOUND_ERROR;
    }
    return requiredTodo;
  } catch (error) {
    let errorObject = {
      message: error.message,
      status: 404,
    };
    if (error.message !== 'Todo not found') {
      errorObject = {
        message: error.message,
        status: 500,
      };
    }
    throw errorObject;
  }
};

const deleteAllTodo = async () => {
  try {
    const message = await fileOps.writeFile(TODO_FILE_PATH, '');
    defaultId = 0;
    return message;
  } catch (error) {
    throw new Error('Error accessing file');
  }
};

module.exports = {
  getAllTodo,
  postTodo,
  getTodo,
  deleteAllTodo,
  defaultId,
};
