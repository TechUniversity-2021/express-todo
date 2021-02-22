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

module.exports = {
  getTodos,
  getTodoByID,
  getTodoByQuery,
};
