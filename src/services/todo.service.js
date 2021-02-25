// const fsFunctions = require('../utils/fsFunctions');
// const { FILE_PATH } = require('../constants/config');
// const parseFileData= require('../utils/parseFileData')
// const { Op } = require('sequelize');
// const toDoRepository = require('../repository/todo.repository');
const { Todo } = require('../models');

const getToDos = async () => {
  const todos = await Todo.findAll();
  // console.log(todos);
  return todos;
};

const fetchToDo = async (toDoId) => {
  const fetchedToDo = await Todo.findOne({
    where: {
      id: toDoId,
    },
  });
  // console.log(fetchedToDo);
  // const fetchedToDo = await toDoRepository.queryGetTodoById(db, toDoId);
  return fetchedToDo;
};

const createToDo = async (body) => {
  const { title } = body;
  const status = body.status || 'Active';

  const createdToDo = await Todo.create({
    title,
    status,
  });
  return createdToDo;
};

const updateToDo = async (body, id) => {
  const { title } = body;
  const { status } = body;
  const updatedToDo = await Todo.update({ title, status }, { where: { id } });
  return updatedToDo;
};

const deleteById = async (toDoId) => {
  const deletedToDo = await Todo.destroy({ where: { id: toDoId } });
  return deletedToDo;
};

module.exports = {
  getToDos,
  fetchToDo,
  createToDo,
  updateToDo,
  deleteById,
};
