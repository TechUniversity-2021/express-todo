const { Todo } = require('../models');

// const getTodosDb = async () => {
//   const todos = await Todo.findAll();
//   return todos;
// };

// const getTodosByIdDb = async (db, id) => {
//   const todos = await Todo.findAll({
//     where: {
//       id,
//     },
//   });
//   return todos;
// };
// const deletedToDoByDb = async (db, id) => {
//   const todos = await db.query('DELETE FROM todos WHERE id=$1', [id]);
//   console.log('in reep delete', todos.rows);
//   return todos.rows;
// };

// const deletedToDoByDb = async (db, id) => {
//   const todos = await Todo.destroy({
//     where: {
//       id,
//     },
//   });

//   return todos;
// };
// const deleteAllToDoByDb = async (db) => {
//   const todos = await db.query('DELETE FROM todos');
//   return todos.rows;
// };
// const deleteAllToDoByDb = async () => {
//   const todos = await Todo.destroy({
//     truncate: true,
//   });
//   return todos;
// };

// const deleteByStatusDb = async (db, status) => {
//   const todos = await db.query(`DELETE FROM todos WHERE status=${status}`);
//   return todos.rows;
// };

// const createTodoDb = async (db, title, status) => {
//   // console.log(`INSERT INTO todos(title,status) VALUES (${title},${status})`);
//   const todos = await Todo.create({ title, status });
//   return todos;
// };

// const updateTodoDb = async (db, title, status, id) => {
//   await db.query(`UPDATE todos SET title='${title}' WHERE id='${id}'`);
//   await db.query(`UPDATE todos SET status='${status}' WHERE id='${id}'`);
//   // return todos.rows;
// };
const updateTodoDb = async (db, title, status, id) => {
  const todo = await Todo.update({ title, status }, {
    where: {
      id,
    },
  });
  return todo;
  // return todos.rows;
};
