const fileUtils = require("../utils/fileUtils");
const uuid = require("uuid");

const getTodo = async () => {
  const fileData = await fileUtils.readAfile("./resources/todos.txt");
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

const getTodoByQuery = async (todo) => {
  const getdata = await getTodo();
  return getdata.filter((item) => {
    return item.todo == todo;
  });
};

const postTodo = async (data) => {
  const title = JSON.stringify(data.todo); //will be "todo". converts object to string
  const status = JSON.stringify(data.status || "Active");
  const entry = `${uuid.v4()}|${JSON.parse(title)}|${JSON.parse(status)}`; //JSON.parse coverts it to: todo. convert string to json object
  const response = await fileUtils.appendToAfile(
    "./resources/todos.txt",
    entry
  );
  return response;
};

const updateTodo = async (id, data) => {
  const fileData = await fileUtils.readAfile("./resources/todos.txt");
  const title = JSON.stringify(data.todo || "");
  const status = JSON.stringify(data.status);
  const updateTodo = fileData
    .split("\n")
    .map((item) => {
      const todo = item.split("|");
      if (id == todo[0]) {
        todo[1] = JSON.parse(title) || todo[1];
        todo[2] = JSON.parse(status);
      }
      return todo.join("|");
    })
    .join("\n");
  await fileUtils.writeToAfile("./resources/todos.txt", updateTodo);
};

const deleteTodoWithId = async (id) => {
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

const deleteTodoWithStatus = async (status) => {
  const data = await fileUtils.readAfile("./resources/todos.txt");
  console.log(status);
  const removeTodo = data
    .split("\n")
    .filter((item) => {
      const todo = item.split("|");
      return status != todo[2];
    })
    .join("\n");
  await fileUtils.writeToAfile("./resources/todos.txt", removeTodo);
};

const deleteAllTodos = async () => {
  await fileUtils.writeToAfile("./resources/todos.txt", "");
};
module.exports = {
  getTodo,
  postTodo,
  updateTodo,
  getTodoWithId,
  deleteTodoWithId,
  getTodoByQuery,
  deleteTodoWithStatus,
  deleteAllTodos,
};
