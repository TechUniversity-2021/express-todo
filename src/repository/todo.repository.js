const getTodos = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};

const getTodo = async (db, id) => {
  const todos = await db.query(`SELECT * FROM todos where id=${id}`);
  return todos.rows;
};

const createTodo = async (db, todo, status) => {
  const id = await db.query(`INSERT INTO todos(title,status) VALUES('${todo}', '${status}') RETURNING id`);
  return id.rows;
};

module.exports = { getTodos, getTodo, createTodo };
