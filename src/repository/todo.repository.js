const { Todo } = require('../models'); // todos should be same as modelName in model->todos.js

const getTodos = async () => {
  const todos = await Todo.findAll();
  return todos;
};

// const getTodos = async (db) => {
//   const todos = await db.query('SELECT * FROM todos');
//   return todos.rows;
// };

const getTodoByID = async (db, id) => {
  const todos = await db.query(`SELECT * FROM todos WHERE id=${id}`);
  return todos.rows;
};

const getTodoByQuery = async (db, query) => {
  const todos = await db.query(`SELECT * FROM todos WHERE title=${query}`);
  return todos.rows;
};

const createTodo = async (message, stat) => {
  const todos = await Todo.create({ title: message, status: stat });
  return todos.dataValues;
};

// const createTodo = async (db, title, status) => {
//   const todos = await db.query(`INSERT INTO todos(title,status) VALUES ('${title}','${status}') RETURNING *`);
//   return todos.rows;
// };

// const updateTodo = async (db, id, title, status) => {
//   const todos = await db.query(`UPDATE todos SET status='${status}',title='${title}' WHERE id=${id} RETURNING *`);
//   return todos.rows;
// };

const updateTodo = async (ID, message, stat) => {
  const todos = await Todo.update({ title: message, status: stat },
    {
      where: {
        id: ID,
      },
    });
  // console.log(todos);
  return todos;
};

const deleteTodo = async (ID) => {
  const todos = await Todo.destroy({
    where: {
      id: ID,
    },
  });
  return todos;
};

// const deleteTodo = async (db, id) => {
//   const todos = await db.query(`DELETE FROM todos WHERE id=${id} RETURNING *`);
//   console.log(todos.rows);
//   return todos.rows;
// };

module.exports = {
  getTodos,
  getTodoByID,
  getTodoByQuery,
  createTodo,
  updateTodo,
  deleteTodo,
};
