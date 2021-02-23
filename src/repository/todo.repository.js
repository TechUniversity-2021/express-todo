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

const updateTodo = async (db, id, todo, status) => {
  const updatedTodo = await db.query(`UPDATE todos SET title='${todo}',status='${status}',updated_at=to_timestamp(${Date.now()} / 1000.0)WHERE id=${id} RETURNING id`);
  return updatedTodo.rows;
};

module.exports = {
  getTodos, getTodo, createTodo, updateTodo,
};
