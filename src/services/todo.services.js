const { Todo } = require('../models');

const getTodos = async () => {
  const todos = await Todo.findAll();
  return todos;
};
const getTodoById = async (id) => {
  const todos = await Todo.findOne({
    where: {
      id,
    },
  });
  return todos;
};

const postTodos = async (todoPost) => {
  await Todo.create(todoPost);
  return `New todo has been created: ${todoPost}`;
};

const putTodos = async (updateId, updatedTodo) => {
  const updateTodo = await Todo.update(updatedTodo, { where: { id: updateId } });
  if (updateTodo === 0) return [];
  return `Updated id ${updatedTodo}`;
};

const deleteTodo = async (deleteId) => {
  const deletedTodo = await Todo.destroy({ where: { id: deleteId } });
  if (deletedTodo === 0) return [];
  return `Deleted id ${deleteId}`;
};
module.exports = {
  getTodos, postTodos, putTodos, getTodoById, deleteTodo,
};
