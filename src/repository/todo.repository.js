const getAllTodos = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};
const getTodoByID = async (db, id) => {
  const todos = await db.query('SELECT * FROM todos where id=$1', [id]);
  return todos.rows;
};
const insertTodo = async (db, title, status) => {
  await db.query(`INSERT INTO todos(title,status)VALUES('${title}','${status}')`);
};

const updateTodo = async (db, id, title, status) => {
  await db.query(`UPDATE todos SET title='${title}', status='${status}' WHERE id=${id}`);
};

const deleteTodoByID = async (db, id) => {
  await db.query(`DELETE FROM todos WHERE id=${id}`);
};

module.exports = {
  getAllTodos, getTodoByID, insertTodo, updateTodo, deleteTodoByID,
};
