const fileUtils = require("../utils/fileUtils");
const { v4: uuidv4 } = require('uuid');

const getTodo = async () => {
  const data = await fileUtils.readAfile("./resources/todos.txt");
  //console.log(data)
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

const postTodo = async (data) => {
  const body = JSON.stringify(data.todo)        //will be "todo"
  const entry = (`${uuidv4()}|${JSON.parse(body)}|active`)    //JSON.parse coverts it to: todo
  await fileUtils.appendToAfile("./resources/todos.txt",entry)
}

module.exports = {
  getTodo,
  postTodo
};
