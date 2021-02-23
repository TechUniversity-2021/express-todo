const getTodos = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};

const getTodoByID = async (db, id) => {
  const todos = await db.query(`SELECT * FROM todos WHERE id=${id}`);
  return todos.rows;
};

const getTodoByQuery = async (db, query) => {
  const todos = await db.query(`SELECT * FROM todos WHERE title=${query}`);
  return todos.rows;
};

const createTodo = async (db, title, status) => {
  const todos = await db.query(`INSERT INTO todos(title,status) VALUES ('${title}','${status}') RETURNING *`);
  return todos.rows;
};

const updateTodo = async (db, id, title, status) => {
  const todos = await db.query(`UPDATE todos SET status='${status}',title='${title}' WHERE id=${id} RETURNING *`);
  return todos.rows;
};

const deleteTodo = async (db, id) => {
  const todos = await db.query(`DELETE FROM todos WHERE id=${id} RETURNING *`);
  console.log(todos.rows);
  return todos.rows;
};

module.exports = {
  getTodos,
  getTodoByID,
  getTodoByQuery,
  createTodo,
  updateTodo,
  deleteTodo,
};
