/* eslint-disable no-useless-catch */
const { v4: uuidv4 } = require('uuid');
const { Connection } = require('pg');
const readUtil = require('../utils/readFile');
const appendUtil = require('../utils/appendFile');
const writeUtil = require('../utils/writeFile');
const { parsingData } = require('../utils/parsingData');
const todoRepository = require('../repository/todo.repository');

const filePath = './src/resources/todo.txt';

const getAllTodos = async (db) => {
  try {
    const todos = await todoRepository.getAllTodos(db);
    return todos;
  } catch (error) {
    throw error;
  }
};
const getTodoByID = async (db, id) => {
  try {
    const todo = await todoRepository.getTodoByID(db, id);
    return todo;
  } catch (error) {
    throw error;
  }
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

const updateTodo = async (id, title, status) => {
  try {
    let tasksObjectArray = await getAllTodos();
    tasksObjectArray = tasksObjectArray.map((taskObject) => {
      if (taskObject.id === id) {
        taskObject.title = title;
        taskObject.status = status;
      }
      return taskObject;
    });

    const newTasksString = tasksObjectArray.reduce((accumulator, taskObject) => accumulator += `${taskObject.id}|${taskObject.title}|${taskObject.status}\n`, '');
    await writeUtil.writeFile(filePath, newTasksString);
  } catch (error) {
    throw error;
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
module.exports = {
  getAllTodos, createTodo, deleteTodoByID, updateTodo, getTodoByID,
};
