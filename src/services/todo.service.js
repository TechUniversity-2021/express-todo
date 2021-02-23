/* eslint-disable no-useless-catch */

const todoRepository = require('../repository/todo.repository');

const getAllTodos = async (db) => {
  try {
    const todos = await todoRepository.getAllTodos(db);
    return todos;
  } catch (error) {
    throw error;
  }
};
const getTodoByID = async (db, id) => {
  try {
    const todo = await todoRepository.getTodoByID(db, id);
    return todo;
  } catch (error) {
    throw error;
  }
};

const createTodo = async (db, title, status) => {
  try {
    await todoRepository.insertTodo(db, title, status);
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (db, id, title, status) => {
  try {
    await todoRepository.updateTodo(db, id, title, status);
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (db, id) => {
  try {
    await todoRepository.deleteTodoByID(db, id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTodos, createTodo, deleteTodo, updateTodo, getTodoByID,
};
