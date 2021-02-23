const getTodos = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};
const getTodosbyId = async (db, id) => {
  const todos = await db.query(`SELECT * FROM todos WHERE id = ${id}`);
  return todos.rows;
};
const createTodos = async (db, title, status) => {
  try {
    const todos = await db.query('INSERT INTO todos(title, status) VALUES ($1, $2)',
      [title, status]);
    return todos;
  } catch (err) {
    return 'error';
  }
};
const updateTodos = async (db, id, newTodo) => {
  try {
    const todos = await db.query('UPDATE todos SET title = $1 WHERE id = $2',
      [newTodo, id]);
    return todos.rows;
  } catch (err) {
    return err.message;
  }
};

const deleteTodo = async (db, id) => {
  try {
    const todos = await db.query(`DELETE FROM todos  WHERE id = ${id}`);
    return todos.rowCount;
  } catch (err) {
    return -1;
  }
};
module.exports = {
  getTodos,
  updateTodos,
  getTodosbyId,
  createTodos,
  deleteTodo,
};
