const getTodos = async (db) => {
  const result = await db.query('SELECT * FROM todos;');
  return result.rows;
};
const getTodoById = async (db, id) => {
  const result = await db.query('SELECT * FROM todos where id = $1', [id]);
  return result.rows;
};
const createTodo = async (db, task) => {
  const result = await db.query(`INSERT INTO todos (title, status) VALUES ('${task}', 'Incomplete')`);// RETURNING * for returning the updated
  // const result = await db.query('SELECT * FROM todos;');
  return result.rowCount;
};
const updateTodo = async (db, id, body) => {
  const result = await db.query(`UPDATE todos SET title='${body.todo}', status='${body.status}' where id=${id};`);
  return result.rowCount;
};
const deleteTodo = async (db, id) => {
  const result = await db.query(`DELETE FROM todos WHERE id=${id}`);
  return result.rowCount;
};
module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
};
