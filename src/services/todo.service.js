/* eslint-disable no-useless-catch */
const { v4: uuidv4 } = require('uuid');
const { Connection } = require('pg');
const readUtil = require('../utils/readFile');
const appendUtil = require('../utils/appendFile');
const writeUtil = require('../utils/writeFile');
const { parsingData } = require('../utils/parsingData');

const filePath = './src/resources/todo.txt';

const getAllTodos = async () => {
  let data;
  try {
    data = await readUtil.fread(filePath);
  } catch (error) {
    throw error;
  }
  const tasks = parsingData(data);
  const tasksObjectArray = tasks.map((task) => {
    const taskDetails = task.split('|');
    const taskObject = {
      id: taskDetails[0],
      title: taskDetails[1],
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
    await appendUtil.appendFile(filePath, todoString);
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

const deleteTodoByID = async (id) => {
  try {
    let tasksObjectArray = await getAllTodos();
    tasksObjectArray = tasksObjectArray.filter((taskObject) => {
      if (taskObject.id === id) return false;
      return true;
    });

    const newTasksString = tasksObjectArray.reduce((accumulator, taskObject) => accumulator += `${taskObject.id}|${taskObject.title}|${taskObject.status}\n`, '');
    await writeUtil.writeFile(filePath, newTasksString);
  } catch (error) {
    throw error;
  }
};
module.exports = { getAllTodos, createTodo, deleteTodoByID };
