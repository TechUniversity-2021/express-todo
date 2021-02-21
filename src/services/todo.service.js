const fileUtils = require("../utils/fileUtils");
const { v4: uuidv4 } = require("uuid");

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

const getTodoWithId = async (id) => {
  const getdata = await getTodo();
  const entry = getdata.filter((item) => {
    return item.id == id
  })
  return(entry)
};

const postTodo = async (data) => {
  const body = JSON.stringify(data.todo); //will be "todo"
  const entry = `${uuidv4()}|${JSON.parse(body)}|active`; //JSON.parse coverts it to: todo
  await fileUtils.appendToAfile("./resources/todos.txt", entry);
};

const updateTodo = async (id, data) => {
  const getData = await getTodo();
  //console.log(getData)
  const body = JSON.stringify(data.status);
  for (i in getData) {
    if (getData[i].id === id) {
      getData[i].status = JSON.parse(body);
    }
  }
  //console.log(getdata)
  //await fileUtils.writeToAfile("./resources/todos.txt",getdata)

  // const filtered = getdata.filter((item) => {
  //   return item.id === id
  // }).map((entry) => {
  //   return entry.status
  // })
  // console.log(filtered)
};

const deleteTodoById = async(id) => {

}

module.exports = {
  getTodo,
  postTodo,
  updateTodo,
  getTodoWithId,
  deleteTodoById
};
