/* eslint-disable no-useless-catch */

const todoRepository = require('../repository/todo.repository');
const { Todo } = require('../models');

const getAllTodos = async () => {
  try {
    const data = await Todo.findAll();
    return data;
  } catch (error) {
    throw error;
  }
};

const getTodoByID = async (id) => {
  try {
    const todo = await Todo.findOne({ where: { id } });
    if (todo.length === 0) {
      throw new RangeError('Todo not found');
    }
    return todo;
  } catch (error) {
    throw error;
  }
};

const createTodo = async (title, status) => {
  try {
    const todo = await Todo.create({ title, status });
    return todo.dataValues;
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (id, title, status) => {
  try {
    const todo = await Todo.update({ title, status }, {
      where: {
        id,
      },
      returning: true,
    });
    if (todo[0] === 0) {
      throw new RangeError('Todo not found');
    }
    return todo[1];
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (id) => {
  try {
    const countOfTodo = await Todo.destroy({
      where: {
        id,
      },
    });
    if (countOfTodo === 0) {
      throw new RangeError('Todo not found');
    }
    return `${countOfTodo} todo deleted`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTodos, createTodo, deleteTodo, updateTodo, getTodoByID,
};
