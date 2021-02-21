const fileUtils = require("../utils/fileUtils");
const uuid = require("uuid");

const getTodo = async () => {
  const fileData = await fileUtils.readAfile("./resources/todos.txt");
  //console.log(fileData)
  const entry = fileData.split("\n");
  return entry.map((item) => {
    const todoData = item.split("|");
    return {
      id: todoData[0],
      todo: todoData[1],
      status: todoData[2],
    };
  });
};

const getTodoWithId = async (id) => {
  const getdata = await getTodo();
  return getdata.filter((item) => {
    return item.id == id;
  });
};

const postTodo = async (data) => {
  //console.log(data)
  const body = JSON.stringify(data.todo); //will be "todo"
  const entry = `${uuid.v4()}|${JSON.parse(body)}|active`; //JSON.parse coverts it to: todo
  const response  =  await fileUtils.appendToAfile("./resources/todos.txt", entry);
  return response
};

const updateTodo = async (id, data) => {
  const fileData = await fileUtils.readAfile("./resources/todos.txt");
  const body = JSON.stringify(data.status);
  const updateTodo = fileData
    .split("\n")
    .map((item) => {
      const todo = item.split("|");
      if (id == todo[0]) {
        todo[2] = JSON.parse(body);
      }
      return todo.join("|");
    })
    .join("\n");
  await fileUtils.writeToAfile("./resources/todos.txt", updateTodo);
};

const deleteTodoById = async (id) => {
  const data = await fileUtils.readAfile("./resources/todos.txt");
  const removeTodo = data
    .split("\n")
    .filter((item) => {
      const todo = item.split("|");
      return id != todo[0];
    })
    .join("\n");
  await fileUtils.writeToAfile("./resources/todos.txt", removeTodo);
};

module.exports = {
  getTodo,
  postTodo,
  updateTodo,
  getTodoWithId,
  deleteTodoById,
};
