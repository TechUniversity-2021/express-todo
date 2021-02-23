const getTodos = async (db) => {
  const result = await db.query('SELECT * FROM todos;');
  return result.rows;
};
const createTodo = async (db, task) => {
  await db.query(`INSERT INTO todos (title, status) VALUES ('${task}', 'Incomplete')`);
  // console.log(7, idk);//Result.rowCount: 1
  const result = await db.query('SELECT * FROM todos;');
  return result.rows;
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
  createTodo,
  deleteTodo,
  updateTodo,
};
