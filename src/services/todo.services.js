/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const { v4: uuidv4 } = require('uuid');
const fileUtils = require('../utils/fileUtils');

const deleteById = async (req, res) => {
  const fileData = await fileUtils.getFileData('../resources/todos.txt');
  const todosLines = fileData.split('\n');
  let formattedText;
  todosLines.forEach((line) => {
    // console.log(line,id.id);
    if (line.startsWith(req.params.id)) {
      // console.log("Hello")
      formattedText = fileData.replace(line, '');
      // fileUtils.updateFile('../resources/todos.txt', formattedText)
    }
  });
  console.log('formated', formattedText);

  const done = await fileUtils.writeFile('../resources/todos.txt', formattedText);
  return done;
};

const createTodo = async (content) => {
  const newTodo = `\n${uuidv4()}|${content.todo}|Active`;
  console.log(newTodo);
  const done = await fileUtils.appendFile('../resources/todos.txt', newTodo);
  return done;
};
const updateTodo = async (id, content) => {
  const fileData = await fileUtils.getFileData('../resources/todos.txt');
  const todosLines = fileData.split('\n');
  let formattedText;
  todosLines.forEach((line) => {
    // console.log(line,id.id);
    if (line.startsWith(id.id)) {
      // console.log("Hello")
      formattedText = fileData.replace(line, `${id.id}|${content.todo}|${content.status}`);
      // fileUtils.updateFile('../resources/todos.txt', formattedText)
    }
  });
  console.log('formated', formattedText);

  const done = await fileUtils.writeFile('../resources/todos.txt', formattedText);
  return done;
};
const getTodos = async () => {
  const fileData = await fileUtils.getFileData('../resources/todos.txt');
  const todosLines = fileData.split('\n');

  const todosObject = todosLines.map((todo) => {
    const items = todo.split('|');
    const object = {
      id: items[0],
      todo: items[1],
      status: items[2],
    };
    return object;
  });

  return todosObject;
};
const getTodosById = async (id) => {
  const fileData = await getTodos();

  const res = fileData.filter((item) => item.id === id);
  // console.log(res)
  return res;
  // const fileData = await fileUtils.getFileData('../resources/todos.txt');

  // const todosLines = fileData.split('\n');

  // let flag = 0;
  // todosLines.forEach((line) => {
  //   // console.log(line,id.id);
  //   if (line.startsWith(id.id)) {
  //     // console.log("Hello")
  //     flag = 1;

  //     // return 'got';
  //   }

  //   return 'id not found';
  // });
};

module.exports = {
  getTodos, createTodo, updateTodo, getTodosById, deleteById,
};
