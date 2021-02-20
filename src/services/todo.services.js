const fileRead = require('../utilities/promisifyReadFile');
const fileAppend = require('../utilities/promisifyAppendFile');

const getTodos = async () => {
  const fileContent = await fileRead.promisifyFs('src/resources/todo.txt');
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
  await fileAppend.promisifyAppendFs('src/resources/todo.txt', todoPost);
};

module.exports = { getTodos, postTodos };
