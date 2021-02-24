const { Todo } = require('../models');

const getAllTodos = async () => {
  const data = await Todo.findAll();
  // console.log(JSON.stringify(data, null, 4));
  return data;
};
getAllTodos();

module.exports = { getAllTodos };
