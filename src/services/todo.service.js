const fileUtils = require("../utils/fileUtils");

const getTodo = async (filePath) => {
  const data = await fileUtils.readAfile("./resources/todos.txt");
  const entry = data.split("\n");
  return entry.map((item) => {
    const todoData = item.split("|");
    return {
      id: todoData[0],
      todo: todoData[1],
      status: todoData[2],
    };
  });
};

module.exports = {
  getTodo,
};
