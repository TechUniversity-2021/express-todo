/* eslint-disable no-console */
const { Todo } = require('../models');

// const getTodos = async (db) => {
//   const todos = await todoRepository.getTodosDb(db);

//   return todos;
// };
const getTodos = async () => {
  const todos = await Todo.findAll();
  return todos;
};
const getTodosById = async (db, id) => {
  const todos = await Todo.findAll({
    where: {
      id,
    },
  });
  return todos;
};

const deleteById = async (db, id) => {
  const todos = await Todo.destroy({
    where: {
      id,
    },
  });

  return todos;
};

const deleteAll = async () => {
  const todos = await Todo.destroy({
    truncate: true,
  });
  return todos;
};
// const deleteByStatus = async (db, status) => {
//   const todos = await todoRepository.deleteByStatusDb(db, status);
//   console.log(todos);
//   return todos;
// };
const createTodo = async (db, title, status) => {
  // console.log(`INSERT INTO todos(title,status) VALUES (${title},${status})`);
  const todos = await Todo.create({ title, status });
  return todos;
};
const updateTodo = async (db, title, status, id) => {
  const todo = await Todo.update({ title, status }, {
    where: {
      id,
    },
  });
  return todo;
  // return todos.rows;
};

module.exports = {
  getTodos, createTodo, updateTodo, getTodosById, deleteById, deleteAll
};
