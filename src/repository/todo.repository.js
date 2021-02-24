const { Todo } = require('../models');

const getTodos = async () => {
  const todos = await Todo.findAll();
  return todos.rows;
};
const getTodoById = async (id) => {
  const todos = await Todo.findAll({
    where: {
      id: `${id}`,
    },
  });
  return todos.rows;
};

const postTodo = async (body) => {
  const title  = body.title;
  const status = body.status;

  const todo = await Todo.create({ title: "isha", lastName: "Doe" })
  //   const todo = await db.query(`SELECT title FROM todos where title=${title}`);
  return todo.rows;
};

const updateTodo = async (body, id, db) => {
  const { title } = body;
  const { status } = body;

  const todo = await db.query(`UPDATE todos SET title='${title}', status='${status}' WHERE id='${id}' RETURNING *`);
  return todo;
};

const deleteTodo = async (id, db) => {
  await db.query(`DELETE from todos WHERE id='${id}'`);
};
module.exports = {
  getTodos, getTodoById, postTodo, updateTodo, deleteTodo,
};
