const fsFunctions = require('../utils/fsFunctions');
const { FILE_PATH } = require('../constants/config');
// const parseFileData= require('../utils/parseFileData')
const getToDoRepository = require('/Users/Asmita_Hajra/express-todo/src/repository/todo.repository.js');

const getToDos = async (db) => {
  const todos = await getToDoRepository.getTodos(db);
  return todos;
};

const parseFileData = (fileData) => {
  const rawList = fileData.split('\n');
  const todoList = rawList.map((todo) => {
    const elements = todo.split('|');
    const todoObject = {
      id: elements[0],
      title: elements[1],
      status: elements[2],
    };
    return todoObject;
  });
  return todoList;
};

// const getFileData = async (db) =>
// // const rawFileData = await fsFunctions.promisifyReadFile(FILE_PATH);
// // const todoObjects = parseFileData(rawFileData);

//   todoObjects;
// const getLastID = (filePath) => {
//   const readLastLines = require('read-last-lines');
//   return readLastLines.read(filePath, 1)
//     .then((lines) => {
//       const elements = lines.split('|');
//       const id = elements[0];
//       return parseInt(id) + 1;
//     });
// };

const postFileData = async (req, res) => {
  // console.log(body);
  // console.log("hi");
  // console.log(body['title']);
  // console.log(body['status']);
  const { body } = req;
  let newID = await getLastID(FILE_PATH);
  if (isNaN(newID)) newID = 1;
  // console.log(newID);
  const newToDoObject = {
    id: newID,
    title: body.title,
    status: body.status,
  };

  const newToDoString = `${newToDoObject.id}|${newToDoObject.title}|${newToDoObject.status}\n`;
  const filePath = await fsFunctions.promisifyAppendFile(FILE_PATH, newToDoString);
  return newToDoObject;
};

const updateFileData = async (req, res) => {
  const toDoId = req.params.id;
  const { body } = req;
  const newToDoString = `${toDoId}|${body.title}|${body.status}`;
  // console.log('putting');
  // console.log(newToDoString);

  const rawFileData = await fsFunctions.promisifyReadFile(FILE_PATH);
  const re = new RegExp(`^${toDoId}\\|.*$`, 'm');
  const updatedFile = rawFileData.replace(re, newToDoString);
  const newToDoList = await fsFunctions.promisifyWriteFile(FILE_PATH, updatedFile);
  return newToDoList;
};

const fetchToDo = async (req, res) => {
  const toDoId = req.params.id;
  const rawFileData = await fsFunctions.promisifyReadFile(FILE_PATH);
  const re = new RegExp(`^${toDoId}\\|.*$`, 'm');
  const foundToDo = re.exec(rawFileData);
  return foundToDo;
};

const dbFetchToDo = async (db, req, res) => {
  const toDoId = req.params.id;
  // const rawFileData = await fsFunctions.promisifyReadFile(FILE_PATH);
  // const re = new RegExp(`^${toDoId}\\|.*$`, 'm');
  // const foundToDo = re.exec(rawFileData);
  const foundToDo = await getToDoRepository.getTodoById();
  return foundToDo;
};

const deleteById = async (req, res) => {
  const toDoId = req.params.id;
  // console.log(toDoId);
  const rawFileData = await fsFunctions.promisifyReadFile(FILE_PATH);
  const re = new RegExp(`^${toDoId}\\|.*\n`, 'm');
  const updatedFile = rawFileData.replace(re, '');
  const newToDoList = await fsFunctions.promisifyWriteFile(FILE_PATH, updatedFile);
  return newToDoList;
};

const deleteByStatus = async (req, res) => {
  const { status } = req.params;
  console.log(status);
  const rawFileData = await fsFunctions.promisifyReadFile(FILE_PATH);
  const re = new RegExp(`.*|.*|${status}\n`, 'm');
  const updatedFile = rawFileData.replace(re, '');
  console.log(updatedFile);
};

module.exports = {
  getToDos,
  postFileData,
  updateFileData,
  fetchToDo,
  deleteById,
  deleteByStatus,
  dbFetchToDo,

};

// getFileData
