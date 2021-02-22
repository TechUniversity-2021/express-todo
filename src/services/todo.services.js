const fileRead = require('../utilities/promisifyReadFile');
const fileAppend = require('../utilities/promisifyAppendFile');
const fileWrite = require('../utilities/promisifyWriteFile');
const constFilePath = require('../constants/filePath');

const getTodos = async () => {
  const fileContent = await fileRead.promisifyFs(constFilePath.filePath());
  const todos = fileContent.toString().split('\n');
  const todoObjects = todos.map((todo) => {
    const tempTodoObj = todo.split('|');
    return {
      id: tempTodoObj[0],
      todo: tempTodoObj[1],
      status: tempTodoObj[2],
    };
  });
  return todoObjects;
};

const postTodos = async (todoPost) => {
  await fileAppend.promisifyAppendFs(constFilePath.filePath(), todoPost);
};

const putTodos = async (updateTodoPut) => {
  await fileWrite.promisifyWriteFs(constFilePath.filePath(), updateTodoPut);
};
module.exports = { getTodos, postTodos, putTodos };
