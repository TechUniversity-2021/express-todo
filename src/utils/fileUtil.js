const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

const readFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

const fileTodoContent = (newTodo) => {
  const newTodoArray = [];
  newTodoArray.push(uuidv4());
  newTodoArray.push(newTodo.todo);
  newTodoArray.push('inactive');
  const newTodoLine = `\n${newTodoArray.join('|')}`;
  return newTodoLine;
};

const writeFile = (filePath, newTodo) => new Promise((resolve, reject) => {
  fs.appendFile(filePath, fileTodoContent(newTodo), (err) => {
    if (err) {
      console.log('error goes here...', err);
      reject(err);
    }
    resolve('todo created : success');
  });
});

const updateFile = (filePath, newTodoData) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, newTodoData, (err) => {
    if (err) {
      console.log('error goes here...', err);
      reject(err);
    }
    resolve('todo update : success');
  });
});
// readFile('abc.txt').then(console.log)

module.exports = { readFile, writeFile, updateFile };
