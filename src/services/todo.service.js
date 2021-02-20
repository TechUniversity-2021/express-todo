const fileUtils = require('../utils/file-utils');

const getTodos = async () => {
  const text = await fileUtils.getFileData('resources/todos.txt');
  const todosLines = text.split('\n');
  //   console.log(todosLines);
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

module.exports = { getTodos };
