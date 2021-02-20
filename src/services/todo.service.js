const fileOps = require('../utilities/fsFunctions.utilities');
const { TODO_FILE_PATH } = require('../constants/configure');

const getAllTodo = async () => {
  try {
    const rawFileData = await fileOps.readFile(TODO_FILE_PATH);
    const todoRawList = rawFileData.split('\n');
    const todoList = todoRawList.map((todo) => {
      const elements = todo.split('|');
      const todoObject = {
        id: elements[0],
        description: elements[1],
        status: elements[2],
      };
      return todoObject;
    });
    return todoList;
  } catch (error) {
    throw new Error('Error reading file data');
  }
};

const postTodo = async (todo) => {
  try {
    const todoRawData = `${todo.id}|${todo.description}|${todo.status}\n`;
    const message = await fileOps.appendFile(TODO_FILE_PATH, todoRawData);
    return message;
  } catch (error) {
    throw new Error('Error appending data');
  }
};
module.exports = {
  getAllTodo,
  postTodo,
};
