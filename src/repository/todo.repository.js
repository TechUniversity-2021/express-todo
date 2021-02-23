const getAllTodo = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};
const getTodo = async (reqId, db) => {
  const todo = await db.query(`SELECT * FROM todos WHERE id = ${reqId}`);
  return todo.rows;
};
module.exports = {
  getAllTodo,
  getTodo,
};
