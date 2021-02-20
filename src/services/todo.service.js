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
    return [];
  }
};

module.exports = {
  getAllTodo,
};
