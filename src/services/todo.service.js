// const path = require('path');
const { v4: uuidv4 } = require('uuid');
const readUtils = require('../utils/readFile');
const appendUtils = require('../utils/appendFile');
const { parsingData } = require('../utils/parsingData');

const filePath = './src/resources/todo.txt';

const getAllTodos = async () => {
  let data;
  try {
    data = await readUtils.fread(filePath);
  } catch (error) {
    return error.message;
  }
  const tasks = parsingData(data);
  const tasksObjectArray = tasks.map((task) => {
    const taskDetails = task.split('|');
    const taskObject = {
      id: taskDetails[0],
      name: taskDetails[1],
      status: taskDetails[2],
    };
    return taskObject;
  });
  return tasksObjectArray;
};

const createTodo = async (title, status) => {
  const id = uuidv4();
  const todoString = `${id}|${title}|${status}`;
  try {
    await appendUtils.appendFile(filePath, todoString);
    return {
      status: 201,
      message: 'task successfully created',
    };
  } catch (error) {
    return {
      status: 404,
      message: error.message,
    };
  }
};
module.exports = { getAllTodos, createTodo };
