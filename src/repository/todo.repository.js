const getTodos = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};

const getTodoById = async (db, id) => {
  const todo = await db.query(`SELECT * FROM todos WHERE id=${id}`);
  return todo.rows;
};

module.exports = {
  getTodos,
  getTodoById,
};
