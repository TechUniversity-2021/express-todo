const todoRepository = require('../repository/todo.repository');

const getAllTodo = async (db) => {
  const result = await todoRepository.getTodos(db);
  return result;
};
const getTodoById = async (db, id) => {
  const fileData = await todoRepository.getTodos(db);
  let reqTodo = fileData.find((todo) => todo.id === id);
  if (!reqTodo) reqTodo = 'No Such ID';
  return reqTodo;
};
const addTodo = async (task, db) => {
  const fileData = await todoRepository.createTodo(db, task);
  return fileData;
};
const updateTodo = async (db, id, body) => {
  const updating = await todoRepository.updateTodo(db, id, body);
  return updating;
};
const deleteTodo = async (db, id) => {
  const fileData = await todoRepository.deleteTodo(db, id);
  return fileData;
};

module.exports = {
  getAllTodo,
  addTodo,
  updateTodo,
  getTodoById,
  deleteTodo,
};
