// const path = require('path');
const utils = require('../utils/readFile');
const { parsingData } = require('../utils/parsingData');

const getAllTodos = async () => {
  const filePath = './src/resources/todo.txt';
  let data;
  try {
    data = await utils.fread(filePath);
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
module.exports = { getAllTodos };
