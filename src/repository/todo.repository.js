const getTodos = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};
const getTodosbyId = async (db, id) => {
  const todos = await db.query(`SELECT * FROM todos WHERE id = ${id}`);
  return todos.rows;
};
const updateTodos = async (db, id, newTodo) => {
  try {
    const todos = await db.query('UPDATE todos SET title = $1 WHERE id = $2',
      [newTodo, id]);
    return todos;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getTodos,
  updateTodos,
  getTodosbyId,
};
