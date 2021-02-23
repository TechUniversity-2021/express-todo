const todoRepository = require('../repository/todo.repository');

const structureFileContent = async (db) => {
  const result = await todoRepository.getTodos(db);
  return result;
};
const getTodoById = async (id, db) => {
  const fileData = await todoRepository.getTodos(db);
  const reqTodo = fileData.find((todo) => todo.id === id);
  return reqTodo;
};
const addTodo = async (task, db) => {
  const fileData = await todoRepository.createTodo(db, task);
  return fileData;
};
const updateTodo = async (db, id, body) => {
  const updating = await todoRepository.updateTodo(db, id, body);
  // console.log(18, updating);
  return updating;
};
const deleteTodo = async (db, id) => {
  const fileData = await todoRepository.deleteTodo(db, id);
  return fileData;
};

module.exports = {
  structureFileContent,
  addTodo,
  updateTodo,
  getTodoById,
  deleteTodo,
};
