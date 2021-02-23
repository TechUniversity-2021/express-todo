/* eslint-disable no-console */
const getTodosDb = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};

const getTodosByIdDb = async (db, id) => {
  const todos = await db.query('SELECT * FROM todos where id=$1', [id]);
  return todos.rows;
};
const deletedToDoByDb = async (db, id) => {
  const todos = await db.query('DELETE FROM todos WHERE id=$1', [id]);
  console.log('in reep delete', todos.rows);
  return todos.rows;
};
const deleteAllToDoByDb = async (db) => {
  const todos = await db.query('DELETE FROM todos');
  return todos.rows;
};

const deleteByStatusDb = async (db, status) => {
  const todos = await db.query(`DELETE FROM todos WHERE status=${status}`);
  return todos.rows;
};

const createTodoDb = async (db, title, status) => {
  // console.log(`INSERT INTO todos(title,status) VALUES (${title},${status})`);
  const todos = await db.query(`INSERT INTO todos(title,status) VALUES ('${title}','${status}')`);
  return todos.rows;
};

const updateTodoDb = async (db, title, status, id) => {
  await db.query(`UPDATE todos SET title='${title}' WHERE id='${id}'`);
  await db.query(`UPDATE todos SET status='${status}' WHERE id='${id}'`);
  // return todos.rows;
};
module.exports = {
  // eslint-disable-next-line max-len
  getTodosDb, getTodosByIdDb, deletedToDoByDb, createTodoDb, updateTodoDb, deleteAllToDoByDb, deleteByStatusDb,
};
